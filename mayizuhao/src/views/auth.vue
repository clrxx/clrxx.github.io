<template>
	<div class="login">
		<div class="login-main wh-1300">
			<ul class="login-utils">
				<li>
					<h2>还没有账号吗?</h2>
					<h3>where there is a will there is a way.</h3>
					<button @click="switchMode(0)">注册</button>
				</li>
				<li class="pl-30">
					<h2>已经有账号了吗?</h2>
					<h3>Because had because, so had so, since has become since, why say why.</h3>
					<button @click="switchMode(1)">登录</button>
				</li>
			</ul>
			<div class="user-info-main white-radius" :class="bounceDirection">
				<div v-show="showModeNum == 0" class="user-sign about-same">
					<h2>注册</h2>
					<ul class="user-options">
						<li>
							<input type="text" placeholder="手机号">
						</li>
						<li class="sms">
							<input type="text" placeholder="手机验证码">
							<button class="btn1">发送验证码</button>
						</li>
						<li class="mb">
							<input type="password" placeholder="你的密码">
						</li>
						<li class="reg">
							<button class="btn2">注册</button>
						</li>
					</ul>
				</div>
				<div v-show="showModeNum == 1" class="user-login about-same">
					<h2>登录</h2>
					<ul class="user-options">
						<li>
							<input type="text" placeholder="手机号">
						</li>
						<li>
							<input type="password" placeholder="你的密码">
						</li>
						<li class="mb">
							<YunPian @YPChange="YPChange" />
						</li>
						<li class="in">
							<a @click="switchMode(2)">忘记密码</a>
							<button class="btn2">登录</button>
						</li>
					</ul>
				</div>
				<div v-show="showModeNum == 2" class="user-retrieve about-same">
					<h2>找回密码</h2>
					<ul class="user-options">
						<li>
							<input type="text" placeholder="手机号">
						</li>
						<li>
							<input type="text" placeholder="手机验证码">
						</li>
						<li class="mb">
							<input type="password" placeholder="你的密码">
						</li>
						<li class="in">
							<button class="btn1">发送验证码</button>
							<button class="btn2">确定</button>
							<button @click="switchMode(1)" class="btn3">返回</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import YunPian from '@/components/yunpian/yunpian';
export default {
	components: {
		YunPian
	},
	data () {
		return {
			showModeNum: 1, // 0代表注册 1代表登录 2代表找回密码
			bounceDirection: 'bounceRight',
			YPtoken: '',
			YPauthenticate: ''
		}
	},
	created () {
		if (this.$route.query.sign == 1) {
			this.showModeNum = 0;
			this.bounceDirection = 'bounceLeft';
		} else {
			this.showModeNum = 1;
			this.bounceDirection = 'bounceRight';
		}
	},
	methods: {
		switchMode (i) {
			this.showModeNum = i;
			if (this.showModeNum == 1 || this.showModeNum == 2) {
				this.bounceDirection = 'bounceRight';
			} else {
				this.bounceDirection = 'bounceLeft';
			}
		},
		YPChange (e) {
			this.YPtoken = e.token;
			this.YPauthenticate = e.authenticate;
		},
		login () {

		}
	}
}
</script>

<style lang="scss" scoped>
	.login {
		height: calc(100vh - 45px);
		background: url("https://img.myzuhao.top/%E8%83%8C%E6%99%AF%E5%9B%BE.jpg") no-repeat center/cover;
		display: flex;
		align-items: center;
		.login-main {
			position: relative;
		}
	}
	.login-utils {
		display: flex;
		padding: 80px 0;
		background: rgba(34, 34, 34, .85);
		li {
			width: 50%;
			padding-left: 50px;
			box-sizing: border-box;
			&:last-of-type {
				padding-left: 80px;
			}
			h2 {
				margin-bottom: 15px;
				color: #fff;
				font-size: 26px;
			}
			h3 {
				margin-bottom: 30px;
				color: #fff;
			}
			button {
				padding: 10px 30px;
				background: transparent;
				border: 1px solid #fff;
				color: #fff;
				font-size: 12px;
				border-radius: 3px;
				transition: all .3s;
				cursor: pointer;
				&:hover {
					background: #ccc;
					color: rgba(34, 34, 34, 0.85);
				}
			}
		}
	}
	.user-info-main {
		overflow: hidden;
		position: absolute;
		top: -80px;
		left: 0;
		width: 650px;
		height: 440px;
		&.bounceLeft {
			animation: bounceLeft 1s forwards;
			.user-sign {
				animation: showSign 1s forwards;
			}
		}
		&.bounceRight {
			animation: bounceRight 1s forwards;
			.user-login {
				animation: showLogin 1s forwards;
			}
			.user-retrieve {
				animation: showLogin 1s forwards;
			}
		}
		.user-sign, 
		.user-login, 
		.user-retrieve {
			opacity: 0;
			visibility: hidden;
			transition: all .4s ease-in-out;
		}
		.user-sign {
  			transform: translate3d(120px, 0, 0);
		}
		.user-login, 
		.user-retrieve {
			transform: translate3d(-120px, 0, 0);
		}
	}
	.about-same {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100%;
		height: 100%;
		padding: 70px 40px;
		box-sizing: border-box;
		h2 {
			color: #e8716d;
			font-size: 24px;
		}
	}
	.user-options {
		li {
			width: 100%;
			margin-bottom: 20px;
			input {
				width: 100%;
				padding: 10px 0;
				border: none;
				border-bottom: 1px solid #ccc;
				color: #999;
				font-size: 16px;
				transition: all .3s;
				&:focus {
					border-bottom: 1px solid #808080;
				}
			}
			button {
				padding: 10px 35px;
				border: none;
				color: #fff;
				font-size: 16px;
				border-radius: 3px;
				transition: all .3s;
			}
			.btn1 {
				background: #c7b9ff;
				&:hover {
					background: #a899e0;
				}
			}
			.btn2 {
				background: #e8716d;
				&:hover {
					background: #e14641;
				}
			}
			.btn3 {
				background: #56adf7;
				&:hover {
					background: #499ade;
				}
			}
		}
		.sms {
			display: flex;
			justify-content: space-between;
			input {
				width: 50%;
			}
		}
		.mb {
			margin-bottom: 35px;
		}
		.reg {
			display: flex;
			justify-content: flex-end;
			margin-bottom: 0;
		}
		.in {
			display: flex;
			justify-content: space-between;
			a {
				color: #ccc;
				font-size: 12px;
				text-decoration: underline;
				transition: all .3s;
				cursor: pointer;
				&:hover {
					color: #b3b3b3;
				}
			}
		}
	}
	@keyframes bounceLeft {
		0% {
			transform: translate3d(calc(100% - 30px), 0, 0);
		}
		50% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(30px, 0, 0);
		}
	}
	@keyframes bounceRight {
		0% {
			transform: translate3d(30px, 0, 0);
		}
		50% {
			transform: translate3d(100%, 0, 0);
		}
		100% {
			transform: translate3d(calc(100% - 30px), 0, 0);
		}
	}
	@keyframes showSign {
		100% {
			opacity: 1;
			visibility: visible;
			transform: translate3d(0, 0, 0);
		}
	}
	@keyframes showLogin {
		100% {
			opacity: 1;
			visibility: visible;
			transform: translate3d(0, 0, 0);
		}
	}

	@media screen and (max-width: 1366px) {
		.login-main {
			width: 1240px;
		}
		.user-info-main {
			width: 620px;
		}
	}
</style>
