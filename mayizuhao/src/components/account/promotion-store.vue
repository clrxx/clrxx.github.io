<template>
	<div class="promotion-store">
		<div class="account-puc">
			<div class="promotion-store-add">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form-label-12">
					<el-form-item label="网吧名称" prop="internetName">
						<el-input type="text" v-model="ruleForm.internetName" size="small"></el-input>
					</el-form-item>
					<el-form-item label="网吧IP" prop="internetIp">
						<el-input type="text" v-model="ruleForm.internetIp" size="small"></el-input>
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
					<el-table-column prop="cont" label="网吧名称" />
					<el-table-column prop="price" label="网吧IP" />
					<el-table-column prop="time" label="结束时间" />
					<el-table-column v-if="showOpts" label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="tableEdit(scope.$index, scope.row)">编辑</el-button>
							<el-button size="mini" type="danger" @click="tableDelete(scope.$index, scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination :total="20" :page-size="10" :current-page="1" @current-change="pageChange" background layout="prev, pager, next" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		let internetIp = (rule, value, callback) => {
			let ipReg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			if (value === '') {
				callback(new Error('请输入网吧ip'));
			} else if (!ipReg.test(value)) {
				callback(new Error('请正确输入网吧ip'));
			} else {
				callback();
			}
		};
		return {
			userRoles: [],
			tableData: [],
			showOpts: false,

			ruleForm: {
				internetName: '',
				internetIp: '',
				time: ''
			},
			rules: {
				internetName: [
					{ required: true, message: '请输入网吧名称', trigger: 'blur' }
				],
				internetIp: [
					{ required: true, validator: internetIp, trigger: 'blur' }
				],
				time: [
					{ required: true, message: '请选择结束时间', trigger: 'blur' }
				]
			},
			
			pageTotal: 20,
			pageSize: 10,
			pageCurrent: 1,
		}
	},
	created () {
		this.userRoles = JSON.parse(localStorage.getItem('userRoles'));
		for (let i = 0; i < this.userRoles.length; i++) {
			if (this.userRoles[i] == '专区') {
				this.showOpts = true;
				return false;
			} 
		}
	},
	methods: {
		datePickerChange (e) {
			this.ruleForm.time = this.$formatDateTime(e);
		},
		submitForm (formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.ruleForm)
				} else {
					console.log('error submit.');
					return false;
				}
			});
		},
		tableEdit(index, row) {
			console.log(index, row);
		},
		tableDelete(index, row) {
			console.log(index, row);
		},
		pageChange (e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>
	.promotion-store-add {
		width: 400px;
		.el-date-editor.el-input {
			width: 100%;
		}
		.el-button {
			width: 100px;
		}
	}
	.promotion-store-table {
		margin-top: 50px;
	}
</style>
