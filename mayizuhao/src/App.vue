<template>
	<div id="app">
		<header-main />
			<div class="content-main">
				<logo-main v-if="this.$route.meta.isShowLogo == 1" />
				<router-view />
			</div>
		<footer-main v-if="this.$route.meta.isShowFooter == 1" />
	</div>
</template>

<script>
import HeaderMain from '@/components/layout/header-main'
import LogoMain from '@/components/layout/logo-main'
import FooterMain from '@/components/layout/footer-main'
export default {
	components: {
		HeaderMain,
		LogoMain,
		FooterMain
	}
}
</script>

<style lang="scss">
	html, body {
		min-width: 1300px;
	}
	.content-main {
		margin-top: 45px;
	}
	.wh-1300 {
		width: 1300px;
		margin: 0 auto;
	}
	.bc-f5f7f9 {
		background: #f5f7f9;
	}
	.white-radius {
		background: #fff;
		border-radius: 5px;
	}
	.null-data {
		padding: 30px 0;
		text-align: center;
	}
	::-webkit-scrollbar {
		width: 10px;
		height: 10px;
	}
	::-webkit-scrollbar-track {
		background: #fff;
	}
	::-webkit-scrollbar-thumb {
		background: #bbb;
		border-radius: 10px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #999;
	}
	.el-pagination  {
		display: flex;
		justify-content: flex-end;
		padding: 20px 0 !important;
	}
	.el-backtop {
		background: rgba(64, 64, 64, .5) !important;
		color: #fff !important;
		transition: all .3s;
		&:hover {
			background: rgba(64, 64, 64, .8) !important;
		}
	}
	.logo-main {
		.border-right input{
			border: none;
			border-right: 1px solid #DCDFE6;
			border-radius: 0;
		}
		.border-none input{
			border: none;
		}
	}
	.index-carousel {
		.el-carousel__arrow {
			background: rgba(31, 45, 61, .3);
		}
		.el-carousel__arrow:hover {
			background: rgba(31, 45, 61, .5);
		}
		.el-carousel__button {
			width: 15px;
			height: 15px;
			border-radius: 15px;
		}
		.el-carousel__indicator.is-active button {
			width: 25px;
		}
	}
	.index-info-data {
		.el-tabs__nav {
			width: 100%;
		}
		.el-tabs__item {
			width: 50%;
			text-align: center;
		}
	}
	.lease-info {
		.el-tabs__item {
			font-size: 16px;
			transition: all .3s;
		}
		.el-tabs__item:hover {
			color: #ff5f5f;
		}
		.el-tabs__item.is-active {
			color: #ff5f5f;
		}
		.el-tabs__nav-wrap::after {
			display: none !important;
		}
		.el-tabs__active-bar {
			background: #ff5f5f;
		}
		.el-tabs__header {
			padding: 0 20px;
			background: #F8F8F8;
		}
	}
	.lease-carousel {
		.el-carousel__arrow {
			background: rgba(255, 95, 95, .7);
		}
		.el-carousel__arrow:hover {
			background: rgba(255, 95, 95, 1);
		}
		.el-carousel__button {
			width: 15px;
			height: 15px;
			background: #ff5f5f;
			border-radius: 15px;
		}
		.el-carousel__indicator.is-active button {
			width: 25px;
		}
	}
	.pay-dialog {
		border-radius: 5px !important;
		.el-dialog__header {
			border-bottom: 1px solid #e8eaec;
		}
		.el-dialog__title {
			font-size: 16px;
		}
	}
	.account-puc {
		.el-page-header__content {
			color: #515a6e;
			font-size: 21px;
			font-weight: bold;
		}
		.back-none {
			.el-page-header__left {
				display: none;
			}
		}
	}
	.form-label-12 {
		label {
			font-size: 12px;
		}
	}
	.change-account {
		.el-upload {
			position: relative;
			overflow: hidden;
			width: 130px;
			height: 130px;
			border: 1px dashed #d9d9d9;
			cursor: pointer;
			&:hover {
				border-color: #409EFF;
			}
		}
	}
	.change-pass {
		.sms {
			.el-form-item__content {
				margin-left: 20px !important;
			}
		}
	}
	.dispute-step {
		.el-step__title {
			font-size: 14px;
			line-height: 1.8;
		}
		.el-step__head.is-success {
			border-color: #409EFF;
			color: #409EFF;
		}
		.el-step__title.is-success {
			color: #409EFF;
		}
		.el-step__description.is-success {
			color: #409EFF;
		}
	}
</style>
