<template>
	<div class="detail white-radius">
		<div class="title">
			<h3>{{ infoData.title }}</h3>
			<h4>发布时间：{{ infoData.createTime | formatDateTime }}</h4>
		</div>
		<div v-html="infoData.summary" class="cont"></div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			infoData: {}
		}
	},
	created () {
		this.cAjax();
	},
	methods: {
		cAjax () {
			this.$api.post('SelectInfo', this.$route.query.nId)
				.then(res => {
					this.infoData = res.obj;
				});
		}
	},
	watch: {
		$route () {
			this.cAjax();
		}
	}
}
</script>

<style lang="scss" scoped>
	.detail {
		padding: 0 15px;
	}
	.title {
		padding: 20px 15px;
		border-bottom: 1px solid #e8eaec;
		h3 {
			font-size: 24px;
			font-weight: bold;
			line-height: 1.3;
			text-align: center;
		}
		h4 {
			margin-top: 20px;
			text-align: right;
		}
	}
	.cont {
		padding: 30px 0;
		* {
			padding: 10px 0 !important;
			background: transparent !important;
			color: #515a6e !important;
			font-size: 14px !important;
			line-height: 1.5 !important;
			word-wrap: break-word !important;
			word-break: break-all !important;
		}
		h1, h2 ,h3, h4, h5, h6 {
			font-size: 16px !important;
		}
	}
</style>
