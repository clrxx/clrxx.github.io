<template>
	<div class="change-pass">
		<div class="account-puc">
			<div class="change-pass-main">
				<div class="radio">
					<el-radio v-model="radioActive" :label="1">原始密码</el-radio>
					<el-radio v-model="radioActive" :label="2">短信验证</el-radio>
				</div>
				<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="form-label-12">
					<el-form-item v-if="radioActive == 2" label="手机号" prop="phone" class="row-item phone">
						<el-input v-model.number="ruleForm.phone" size="small" maxlength="11" placeholder="请输入手机号"></el-input>
					</el-form-item>
					<el-form-item v-if="radioActive == 2" prop="sms" class="row-item sms">
						<el-input v-model="ruleForm.sms" size="small" placeholder="验证码"></el-input>
						<el-button v-if="isSms" @click="sendSms" size="small" class="send-sms">发送验证码</el-button>
						<el-button v-if="!isSms" size="small" class="send-sms">{{ smsTimer }}s后重新发送</el-button>
					</el-form-item>
					<el-form-item v-if="radioActive == 1" label="登录密码" prop="opass">
						<el-input type="password" v-model="ruleForm.opass" size="small"></el-input>
					</el-form-item>
					<el-form-item label="新支付密码" prop="pass">
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
			isSms: true,
			smsTimer: 60,
			radioActive: 1,
			ruleForm: {
				opass: '',
				pass: '',
				checkPass: '',
				phone: '',
				sms: ''
			},
			rules: {
				opass: [
					{ required: true, message: '请输入登录密码', trigger: 'blur' }
				],
				pass: [
					{ required: true, validator: validatePass, trigger: 'blur' }
				],
				checkPass: [
					{ required: true, validator: validatePass2, trigger: 'blur' }
				],
				phone: [
					{ required: true, validator: validatePn, trigger: 'blur' },
					{ type: 'number', message: '手机号码须为数字' }
				],
				sms: [
					{ required: true, message: '请输入验证码', trigger: 'blur' },
				]
			}
		}
	},
	created () {
		this.$api.post('BaseInfo')
			.then(res => {
				this.ruleForm.phone = parseInt(res.obj.tel);
			});
	},
    methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					let data = {
						updateType: 0,
						pwd: this.ruleForm.opass,
						newPwd: this.ruleForm.pass,
						tel: this.ruleForm.phone
					}
					if (this.radioActive == 2) {
						data.updateType = 1;
						data.pwd = this.ruleForm.sms;
					}
					this.$api.post('UpPayPwd', data)
						.then(res => {
							this.$notify({
								title: '温馨提示',
								message: '密码修改成功',
							});
							this.radioActive = 1;
							this.radioChange();
						});
				}
			});
		},
		sendSms () {
			this.$api.post('SendTelCode', this.ruleForm.phone)
				.then(res => {
					this.$notify({
						title: '温馨提示',
						message: '验证码已发送，请注意查收。',
					});
					this.isSms = false;
					let timer = setInterval(() => {
						this.smsTimer --;
						if (this.smsTimer == 0) {
							clearInterval(timer);
							this.isSms = true;
							this.smsTimer = 60;
						}
					}, 1000);
				});
		},
		radioChange () {
			this.$refs['ruleForm'].resetFields();
		}
    }
}
</script>

<style lang="scss" scoped>

</style>
