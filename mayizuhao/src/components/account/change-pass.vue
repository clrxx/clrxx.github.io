<template>
	<div class="change-pass">
		<div class="account-puc">
			<div class="change-pass-main">
				<div class="radio">
					<el-radio v-model="radioActive" :label="1" @change="radioChange">原始密码</el-radio>
					<el-radio v-model="radioActive" :label="2" @change="radioChange">短信验证</el-radio>
				</div>
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form-label-12">
					<el-form-item v-if="radioActive == 2" label="手机号" prop="pn" class="row-item pn">
						<el-input v-model.number="ruleForm.pn" size="small" maxlength="11" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item v-if="radioActive == 2" prop="sms" class="row-item sms">
						<el-input v-model="ruleForm.sms" size="small" placeholder="验证码"></el-input>
						<el-button size="small" class="send-sms">发送验证码</el-button>
					</el-form-item>
					<el-form-item v-if="radioActive == 1" label="原密码" prop="opass">
						<el-input type="password" v-model="ruleForm.opass" size="small"></el-input>
					</el-form-item>
					<el-form-item label="新密码" prop="pass">
						<el-input type="password" v-model="ruleForm.pass" size="small"></el-input>
					</el-form-item>
					<el-form-item label="确认新密码" prop="checkPass">
						<el-input type="password" v-model="ruleForm.checkPass" size="small"></el-input>
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
	data() {
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
		let validatePn = (rule, value, callback) => {
			let pnReg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
			if (value === '') {
				callback(new Error('请输入手机号码'));
			} else if (!pnReg.test(value)) {
				callback(new Error('请正确输入手机号码!'));
			} else {
				callback();
			}
		};
		return {
			radioActive: 1,
			ruleForm: {
				opass: '',
				pass: '',
				checkPass: '',
				pn: '',
				sms: ''
			},
			rules: {
				opass: [
					{ required: true, message: '请输入原密码', trigger: 'blur' }
				],
				pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, validator: validatePass2, trigger: 'blur' }
				],
				pn: [
					{ required: true, validator: validatePn, trigger: 'blur' },
					{ type: 'number', message: '手机号码须为数字' }
				],
				sms: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
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
		},
		radioChange () {
			this.$refs['ruleForm'].resetFields();
		}
    }
}
</script>

<style lang="scss" scoped>
	.change-pass-main {
		width: 500px;
		.radio {
			padding-bottom: 20px;
		}
		.row-item {
			display: inline-block;
		}
		.pn {
			.el-input {
				width: 165px;
			}
		}
		.sms {
			.el-input {
				width: 100px;
			}
		}
		.send-sms {
			margin: 1px 0 0 20px;
		}
	}
</style>
