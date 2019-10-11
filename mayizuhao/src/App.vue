<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
	created () {
		let _old = parseInt(localStorage.getItem('MYloginTimestamp'));
		let _now = new Date().getTime();
		let _old30 = _old + 60 * 60 * 1000;
		if ( _old30 < _now ) localStorage.clear();
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
	.el-image {
		width: 100%;
		height: 100%;
		background: #f5f7fa;
		.image-slot {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 100%;
			color: #909399;
			font-size: 30px;
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
			background: rgba(31, 45, 61, .5);
		}
		.el-carousel__arrow:hover {
			background: rgba(31, 45, 61, .7);
		}
		.el-carousel__button {
			width: 15px;
			border-radius: 15px;
		}
		.el-carousel__indicator.is-active button {
			width: 25px;
		}
		.carousel:hover .el-carousel__button{
			height: 15px;
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
	.filtering {
		.el-tabs__nav-wrap::after {
			background: transparent;
		}
		.el-tabs__header {
			margin: 0;
		}
		.el-tabs__active-bar {
			bottom: 3px;
		}
		.el-input-number__decrease, 
		.el-input-number__increase {
			top: 2px;
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
	.new-games-list .el-image, 
	.hot-games-list .el-image {
		background: rgba(0, 0, 0, .6);
		color: #fff;
	}
	.new-games-list .el-image__error, 
	.hot-games-list .el-image__error {
		background: transparent;
		color: #fff;
	}
	.lease-carousel {
		.el-carousel__container {
			height: 100%;
		}
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
	.lease-dialog{
		.el-dialog__header {
			border-bottom: 1px solid #e8eaec;
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
	.gallery-box {
		._magnifier img {
			object-fit: contain;
		}
	}
</style>
