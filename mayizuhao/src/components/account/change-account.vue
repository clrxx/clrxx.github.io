<template>
	<div class="change-account white-radius">
		<div class="change-account-main">
			<el-upload
				class="avatar-uploader"
				action="https://jsonplaceholder.typicode.com/posts/"
				:show-file-list="false"
				:on-success="avatarSuccess"
				:on-error="avatarError">
				<img v-if="avatarPic" :src="avatarPic" class="avatar" alt="pic">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<ul class="change-account-list">
				<li>
					<label>邮箱</label><el-input v-model="email" size="small" placeholder="请输入邮箱"></el-input>
				</li>
				<li>
					<label>用户名</label><el-input v-model="userName" size="small" placeholder="请输入用户名"></el-input>
				</li>
				<li>
					<el-button type="primary" size="small">提交修改</el-button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			avatarPic: require('@/assets/default-avatar.png'),
			email: '',
			userName: ''
		}
	},
	methods: {
		avatarSuccess (res, file) {
			console.log(file);
		},
		avatarError (err, file) {
			console.log(file);
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
