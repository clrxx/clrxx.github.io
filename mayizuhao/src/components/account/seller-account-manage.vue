<template>
	<div class="seller-account-manage">
		<div class="account-puc">
			<el-page-header class="back-none" content="出租账号管理" />
			<div class="account-puc-cont">
				<ul class="account-puc-list">
					<li>
						<el-date-picker
							v-model="datePicker"
							type="datetimerange"
							range-separator="至"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
							@change="datePickerChange"
							size="small">
						</el-date-picker>
					</li>
				</ul>
			</div>
			<el-tabs v-model="tabsActive" @tab-click="tabsClick">
				<el-tab-pane v-for="item in tabsArr" :key="item" :label="item" :name="item">
					<div class="order-info">
						<div class="tables">
							<el-table :data="tableData" ref="multipleTable">
								<el-table-column label="帐号信息">
									<template slot-scope="scope">
										<div class="dot">
											<el-image fit="cover" :src="scope.row.goodFirstImage" class="pic">
												<div slot="placeholder" class="image-slot">
													<i class="el-icon-picture-outline"></i>
												</div>
											</el-image>
											<div>
												<h3><el-tooltip effect="dark" content="该商品已加入免费专区，用户租号费用由蚂蚁补贴" placement="top"><em>免</em>
												</el-tooltip>{{ scope.row.goodPath }}</h3>
												<p>{{ scope.row.title }}</p>
												<p>商品编号：{{ scope.row.code }}</p>
											</div>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="价格" width="120">
									<template slot-scope="scope">
										<p class="price">{{ scope.row.price }}</p>
									</template>
								</el-table-column>
								<el-table-column label="押金" width="120">
									<template slot-scope="scope">
										<p class="cash">{{ scope.row.deposit }}</p>
									</template>
								</el-table-column>
								<el-table-column label="商品状态" width="120">
									<template slot-scope="scope">
										<p class="status">{{ scope.row.stateStr }}</p>
									</template>
								</el-table-column>
								<el-table-column label="操作" width="180">
									<template slot-scope="scope">
										<div class="opts">
											<!-- <el-link v-if="tabsActive == '可租赁' || tabsActive == '仓库中'" type="warning" @click="handleRemove(scope.$index, scope.row)">下架</el-link> -->
											<el-link type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-link>
											<el-link type="danger" @click="handlePass(scope.$index, scope.row)">修改密码</el-link>
										</div>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</div>
				</el-tab-pane>
			</el-tabs>
			<div v-if="tableData.length > 0" class="pagination">
				<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
			</div>
		</div>
		<el-dialog custom-class="pay-dialog" title="修改密码" :visible.sync="dialogVisible" @close="dialogClose" width="500px">
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form-label-12">
				<el-form-item label="商品新密码" prop="pass">
					<el-input type="password" v-model="ruleForm.pass" size="small"></el-input>
				</el-form-item>
				<el-form-item label="确认新密码" prop="checkPass">
					<el-input type="password" v-model="ruleForm.checkPass" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="submitForm('ruleForm')">确认修改</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else {
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		let validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入新密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次密码输入不一致!'));
			} else {
				callback();
			}
		};
		return {
			goodsCode: '',
			datePicker: null,
			orderStateNum: 0,
			tabsActive: '全部',
			tabsArr: ['全部', '待审核', '可租赁', '出租中', '仓库中', '维权中'],
			tableData: [],
			dialogVisible: false,
			ruleForm: {
				pass: '',
				checkPass: '',
			},
			rules: {
				pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, validator: validatePass2, trigger: 'blur' }
				]
			},

			pageTotal: 10,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	created () {
		this.cAjax();
	},
	methods: {
		cAjax () {
			let _params = {
				orderState: this.orderStateNum,
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1),
				createTimeOrder: {
					flag: true,
					desc: true,
					index: 0
				}
			};
			if (this.datePicker) {
				_params = Object.assign({
					createTime: {
						startTime: this.datePicker[0],
						startTimeStr: this.datePicker[0],
						endTime: this.datePicker[1],
						endTimeStr: this.datePicker[1],
					}
				}, _params);
			}
			this.$api.post('SellGoodPage', _params)
				.then(res => {
					this.tableData = res.obj.obj;
					this.pageTotal = res.obj.allItemCount;
				})
		},
		datePickerChange (e) {
			if (e) {
				let _arr = [];
				e.forEach(el => {
					_arr.push(this.$moment(el).format('YYYY-MM-DD HH:mm:ss'));
				});
				this.datePicker = _arr;
			}
			this.pageCurrent = 1;
		},
		tabsClick (e) {
			let _index = parseInt(e.index);
			switch (_index) {
				case 0:
					this.orderStateNum = 0;
					break;
				case 1:
					this.orderStateNum = 5;
					break;
				case 2:
					this.orderStateNum = 1;
					break;
				case 3:
					this.orderStateNum = 2;
					break;
				case 4:
					this.orderStateNum = 3;
					break;
				case 5:
					this.orderStateNum = 4;
					break;
				default:
					break;
			}
			this.pageCurrent = 1;
			this.cAjax();
		},
		handleEdit (index, row) {
			this.$router.push({path: '/release-change', query: {goodsCode: row.code}});
		},
		// handleRemove (index, row) {
		// 	this.$notify({
		// 		title: '温馨提示',
		// 		message: '商品删除成功'
		// 	});
		// },
		handlePass (index, row) {
			this.dialogVisible = true;
			this.goodsCode = row.code;
		},
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.$api.post('UpdateGoodBaseInfo', {
						code: this.goodsCode,
						accountPwd: this.ruleForm.pass,
					}).then(res => {
						this.$notify({
							title: '温馨提示',
							message: '商品密码修改成功'
						});
						this.ruleForm.pass = '';
						this.ruleForm.checkPass = '';
						this.dialogVisible = false;
					});
				}
			});
		},
		dialogClose () {
			this.$refs['ruleForm'].resetFields();
		},
		pageChange (e) {
			this.pageCurrent = e;
			this.cAjax();
		}
	}
}
</script>

<style lang="scss" scoped>
	.order-info {
		.tables {
			border: 1px solid #e8eaec;
			border-bottom: none;
		}
		.dot {
			display: flex;
			.pic {
				width: 80px;
				height: 80px;
				margin-right: 10px;
				border-radius: 5px;
			}
			h3 {
				margin-bottom: 10px;
				color: #333;
				line-height: 1.3;
				em {
					padding: 2px;
					margin-right: 5px;
					background: #f54e35;
					color: #fff;
					font-size: 12px;
					line-height: 1;
					border-radius: 3px;
					cursor: default;
				}
			}
			p {
				color: #999;
				font-size: 12px;
			}
		}
		.status {
			color: #ff9900;
		}
		.opts {
			a {
				padding: 0 5px;
			}
		}
	}
</style>
