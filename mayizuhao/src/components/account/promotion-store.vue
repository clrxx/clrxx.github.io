<template>
	<div class="promotion-store">
		<div class="account-puc">
			<div v-if="showOpts" class="promotion-store-add">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form-label-12">
					<el-form-item label="网吧名称" prop="name">
						<el-input type="text" v-model="ruleForm.name" size="small"></el-input>
					</el-form-item>
					<el-form-item label="网吧IP" prop="ip">
						<el-input type="text" v-model="ruleForm.ip" size="small"></el-input>
					</el-form-item>
					<el-form-item label="结束时间" prop="time">
						<el-date-picker
							v-model="ruleForm.time"
							type="datetime"
							placeholder="选择日期时间"
							@change="datePickerChange"
							size="small">
						</el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" @click="submitForm('ruleForm')">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="promotion-store-table">
				<el-table :data="tableData" border>
					<el-table-column prop="name" label="网吧名称" />
					<el-table-column prop="ip" label="网吧IP" />
					<el-table-column prop="expirationTimeStr" label="结束时间" />
					<el-table-column v-if="showOpts" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="tableEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div v-if="tableData.length > 0" class="pagination">
					<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		let validateIp = (rule, value, callback) => {
			let ipReg = /^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			if (value === '') {
				callback(new Error('请输入网吧ip'));
			} else if (!ipReg.test(value)) {
				callback(new Error('请正确输入网吧ip'));
			} else {
				callback();
			}
		};
		return {
			tableData: [],
			showOpts: false,
			isAddIp: 1,

			ruleForm: {
				name: '',
				ip: '',
				time: ''
			},
			rules: {
				name: [
					{ required: true, message: '请输入网吧名称', trigger: 'blur' }
				],
				ip: [
					{ required: true, validator: validateIp, trigger: 'blur' }
				],
				time: [
					{ required: true, message: '请选择结束时间', trigger: 'blur' }
				]
			},
			
			pageTotal: 10,
			pageSize: 10,
			pageCurrent: 1,
		}
	},
	created () {
		this.$api.post('GetRoles')
			.then(res => {
				let roles = res.obj;
				for (let i = 0; i < roles.length; i++) {
					if (roles[i] == '专区') {
						this.showOpts = true;
						return false;
					}
				}
			})
		this.cAjax();
	},
	methods: {
		cAjax () {
			this.$api.post('IPPage', {
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1)
			}).then(res => {
				this.tableData = res.obj.obj;
				this.pageTotal = res.obj.allItemCount;
			})
		},
		datePickerChange (e) {
			this.ruleForm.time = this.$moment(e).format('YYYY-MM-DD HH:mm:ss');
		},
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					if (this.isAddIp == 1) {
						// 添加ip
						this.$api.post('AddIP', {
							ip: this.ruleForm.ip,
							name: this.ruleForm.name,
							expirationTime: this.ruleForm.time
						}).then(res => {
							this.cAjax();
							this.$refs[formName].resetFields();
						})
					} else {
						// 修改ip
						this.$api.post('UpdateIP', {
							id: this.ipId,
							ip: this.ruleForm.ip,
							name: this.ruleForm.name,
							expirationTime: this.ruleForm.time
						}).then(res => {
							this.cAjax();
							this.isAddIp = 1;
							this.$refs[formName].resetFields();
						})
					}
				}
			});
		},
		tableEdit(index, row) {
			this.isAddIp = 2;
			this.ipId = row.id;
			this.ruleForm.ip = row.ip;
			this.ruleForm.name = row.name;
			this.ruleForm.time = row.expirationTimeStr;
		},
		tableDelete(index, row) {
			this.$api.post('RemoveIP', row.id)
				.then(res => {
					this.$notify({
						title: '温馨提示',
						message: 'ip删除成功'
					});
					this.pageCurrent = 1;
					this.cAjax();
				})
		},
		pageChange (e) {
			this.pageCurrent = e;
			this.cAjax();
		}
	}
}
</script>

<style lang="scss" scoped>
	.promotion-store-add {
		width: 400px;
		margin-bottom: 50px;
		.el-date-editor.el-input {
			width: 100%;
		}
		.el-button {
			width: 100px;
		}
	}
</style>
