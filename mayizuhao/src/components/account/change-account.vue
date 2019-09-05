<template>
	<div class="change-account white-radius">
		<div class="change-account-main">
			<el-upload
				class="avatar-uploader"
				accept=".jpg,.jpeg,.png"
				:action="upImgUrl"
				:show-file-list="false"
				:before-upload="beforeUpload"
				:on-success="avatarSuccess"
				:on-error="avatarError">
				<img v-if="userPic" :src="userPic" class="avatar" alt="pic">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				<div slot="tip" class="el-upload__tip">仅支持jpg/jpeg/png格式，且不超过500kb</div>
			</el-upload>
			<ul class="change-account-list">
				<li>
					<label>用户名</label><el-input v-model="userName" size="small" placeholder="请输入用户名"></el-input>
				</li>
				<li>
					<label>邮箱</label><el-input v-model="userEmail" size="small" placeholder="请输入邮箱"></el-input>
				</li>
				<li>
					<el-button @click="upBaseInfo" type="primary" size="small">提交修改</el-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { upImgUrl } from '@/common/api'
export default {
	data () {
		return {
			upImgUrl,
			userPic: '',
			userName: '',
			userEmail: ''
		}
	},
	methods: {
		beforeUpload (file) {
			if (file.size > 1024*500) {
				this.$notify({
					title: '温馨提示',
					message: '单张图片最大仅限500kb'
				});
				return false;
			}
		},
		avatarSuccess (res, file) {
			this.userPic = file.response.obj[0];
		},
		avatarError (err, file) {
			this.$notify({
				title: '温馨提示',
				message: '上传失败，请稍候再试。'
			});
		},
		upBaseInfo () {
			let emailReg  = /^[A-Za-zd0-9]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
			if (!this.userPic && !this.userName && !this.userEmail) {
				this.$notify({
					title: '温馨提示',
					message: '至少选择修改一项'
				});
			} else if (this.userEmail && !emailReg.test(this.userEmail)) {
				this.$notify({
					title: '温馨提示',
					message: '邮箱格式不正确'
				});
			} else {
				this.$api.post('UpBaseInfo', {
					headImage: this.userPic,
					name: this.userName,
					email: this.userEmail
				}).then(res => {
					this.$notify({
						title: '温馨提示',
						message: '选择修改的信息修改成功'
					});
					let MYuserInfo = JSON.parse(localStorage.getItem('MYuserInfo'));
					if (this.userPic) {
						MYuserInfo.userPic = this.userPic;
					}
					if (this.userName) {
						MYuserInfo.userName = this.userName;
						location.reload();
					}
					localStorage.setItem('MYuserInfo', JSON.stringify(MYuserInfo));
					this.userPic = '';
					this.userName = '';
					this.userEmail = '';
				})
			}
		}
    }
}
</script>

<style lang="scss" scoped>
	.change-account-main {
		width: 350px;
		padding: 20px 50px 15px;
	}
	.change-account {
		.avatar-uploader {
			margin-bottom: 20px;
			text-align: center;
			img {
				width: 100%;
				border-radius: 50%;
			}
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			line-height: 130px;
			text-align: center;
		}
	}
	.change-account-list {
		li {
			display: flex;
			align-items: center;
			padding: 10px 0;
			label {
				flex-shrink: 0;
				min-width: 60px;
			}
			.el-button {
				width: 150px;
				margin-left: 60px;
			}
		}
	}
</style>
