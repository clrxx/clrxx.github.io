<template>
	<div class="change-pay-pass">
		<div class="account-puc">
			<div class="change-pay-pass-main">
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form-label-12">
					<el-form-item label="登录密码" prop="loginPass">
						<el-input type="password" v-model="ruleForm.loginPass" size="small"></el-input>
					</el-form-item>
					<el-form-item label="新支付密码" prop="payPass">
						<el-input type="password" v-model="ruleForm.payPass" size="small"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="small" @click="submitForm('ruleForm')">提交修改</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			ruleForm: {
				loginPass: '',
				payPass: ''
			},
			rules: {
				loginPass: [
					{ required: true, message: '请输入登录密码', trigger: 'blur' }
				],
				payPass: [
					{ required: true, message: '请输入新支付密码', trigger: 'blur' }
				]
			}
		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(this.ruleForm);
				} else {
					console.log('error submit.');
					return false;
				}
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.change-pay-pass-main {
		width: 350px;
	}
</style>
