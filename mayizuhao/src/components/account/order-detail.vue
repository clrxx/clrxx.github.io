<template>
	<div class="order-detail">
		<div class="order-detail-mian white-radius"> 
			<el-page-header @back="$router.back()" content="我出租的帐号" />
			<div class="order-detail-title"><h3>订单详情</h3><a>上号帮助</a></div>
			<div class="order-detail-cont">
				<div class="status">
					<p>订单编号：151451644</p>
					<p>订单状态：正在进行中</p>
				</div>
				<div class="cont">
					<div class="dot">
						<div class="lt">
							<img src="@/assets/hotgame3.jpg" alt="pic">
							<div class="wz">
								<h3>商品名称：什么什么游戏</h3>
								<p>货架号：5451545</p>
								<p>游戏区服：5451545</p>
								<p>角色名：5451545</p>
							</div>
						</div>
						<div class="rt">
							<button class="btn1">续租</button>
							<button class="btn2">投诉/退款</button>
						</div>
					</div>
					<div class="time">
						<p>开始时间：2018-05-05 05:05:05</p>
						<p>结束时间：2018-05-05 05:05:05</p>
						<span>倒计时：01:01:01</span>
					</div>
					<div class="code">
						<h3>解锁码：{{ clipCont }}</h3>
						<button v-clipboard:copy="clipCont" 
								v-clipboard:success="clipboardRes" 
								v-clipboard:error="clipboardErr"
								class="btn1">复制解锁码</button>
						<a href="https://img.myzuhao.top/%E8%9A%82%E8%9A%81%E4%B8%8A%E5%8F%B7%E5%99%A8%E5%AE%89%E8%A3%85%E5%8C%85472.exe" download="蚂蚁上号器安装包.exe" class="btn2">下载上号器</a>
					</div>
				</div>
			</div>
		</div>
		<div class="order-pay-main white-radius">
			<div class="order-detail-title"><h3>付款信息</h3></div>
			<ul class="pay-list">
				<li><span>订单金额：</span><span>￥66.66</span></li>
				<li><span>订单押金：</span><span>￥0.00</span></li>
				<li><span>使用红包：</span><span>￥0.00</span></li>
			</ul>
			<div class="tip">
				<div class="pt">
					<span>注：</span>
					<p>1、如果出现被挤号、顶号的情况，请及时截图并保存，投诉时需要此截图作为证据上传。</p>
					<p>2、您的押金会在订单完成后24小时内退回到您的租号账户。</p>
				</div>
				<h4>实付总额：￥66.66</h4>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			clipCont: 'message'
		}
	},
	methods: {
		clipboardRes () {
			this.$notify({
				title: '复制成功',
				message: `请核对解锁码：${this.clipCont}`,
				type: 'success'
			});
		},
		clipboardErr () {
			this.$notify.error({
				title: '网络繁忙',
				message: '请手动复制解锁码'
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.order-detail-mian {
		padding: 15px;
		box-sizing: border-box;
	}
	.el-page-header {
		padding-bottom: 20px;
		margin-bottom: 20px;
		border-bottom: 1px solid #e8eaec;
	}
	.order-detail-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
		h3 {
			font-weight: bold;
		}
		a {
			color: red;
		}
	}
	.order-detail-cont {
		margin-top: 15px;
		border: 1px solid #e8eaec;
		.status {
			display: flex;
			padding: 5px 15px;
			background: #efefef;
			p {
				margin-right: 30px;
			}
		}
		.cont {
			padding: 20px;
			box-sizing: border-box;
				button {
					padding: 5px 10px;
					border: none;
					outline: none;
					border-radius: 3px;
			}
			.btn1 {
				margin-right: 15px;
				color: #fff;
				background: red;
			}
			.btn2 {
				background: #ffe1e1;
				color: red;
			}
		}
		.dot {
			display: flex;
			align-items: center;
			padding-bottom: 20px;
			border-bottom: 1px solid #e8eaec;
			.lt {
				display: flex;
				flex: 1;
				img {
					width: 80px;
					height: 80px;
					margin-right: 10px;
					object-fit: cover;
				}
				h3 {
					margin-bottom: 7px;
					color: #333;
					font-weight: bold;
					line-height: 1.3;
				}
				p {
					margin-bottom: 4px;
				}
			}
			.rt {
				flex-shrink: 0;
			}
		}
		.time {
			margin-top: 20px;
			p {
				margin-bottom: 5px;
			}
			span {
				color: red;
				font-weight: bold;
			}
		}
		.code {
			display: flex;
			align-items: center;
			margin-top: 20px;
			h3 {
				font-weight: bold;
				margin-right: 50px;
			}
			a {
				padding: 5px 10px;
				border-radius: 3px;
			}
		}
	}
	.order-pay-main {
		padding: 15px;
		margin-top: 10px;
		box-sizing: border-box;
		.pay-list {
			margin-top: 20px;
			li {
				display: flex;
				justify-content: space-between;
				padding: 5px 0;
			}
		}
		.tip {
			display: flex;
			margin-top: 30px;
			.pt {
				flex: 1;
				position: relative;
				padding-left: 30px;
			}
			p {
				margin-bottom: 5px;
				line-height: 1.3;
			}
			span {
				position: absolute;
				top: 0;
				left: 0;
				line-height: 1.3;
			}
			h4 {
				flex-shrink: 0;
				padding-left: 100px;
				font-weight: bold;
			}
		}
	}
</style>
