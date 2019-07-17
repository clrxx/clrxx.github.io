<template>
	<div class="error-page">
		<div class="cont">
			<img :src="src" :alt="code">
			<h3>{{ code }}</h3>
			<h4>{{ desc }}</h4>
		</div>
		<div class="btns">
			<el-button size="small" @click="backHome">返回首页</el-button>
			<el-button size="small" @click="backPrev">返回上一页({{ second }}s)</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'error-content',
	props: {
		code: String,
		desc: String,
		src: String
	},
	data () {
		return {
			second: 5,
			timer: null
		}
	},
	created () {
		this.timer = setInterval(() => {
			if (this.second == 0) this.backPrev();
			else this.second--;
		}, 1000)
	},
	beforeDestroy () {
		clearInterval(this.timer);
	},
	methods: {
		backHome () {
			this.$router.push('/');
		},
		backPrev () {
			this.$router.back();
		}
	}
}
</script>

<style lang="scss" scoped>
	.error-page {
		padding-top: 50px;
		.cont {
			position: relative;
			width: 50%;
			margin: 0 auto;
			img {
				width: 100%;
			}
			h3 {
				position: absolute;
				left: 0;
				top: 0;
				color: #348eed;
				font-size: 80px;
				font-weight: 700;
			}
			h4 {
				position: absolute;
				left: 0;
				top: 100px;
				width: 700px;
				color: #67647d;
				font-size: 20px;
				font-weight: 700;
			}
		}
		.btns {
			width: 50%;
			margin: 0 auto;
			text-align: right;
			.el-button {
				margin-left: 20px
			}
		}
	}
</style>

