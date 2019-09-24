<template>
	<div class="payment bc-f5f7f9">
		<div class="payment-main wh-1300 white-radius">
			<div class="payment-info">
				<h2><img src="@/assets/order-suc.png" alt="icon">恭喜您下单成功，请按照<span>下面流程</span>进行上号</h2>
				<ul class="game-info">
					<li class="game-cont">
						<el-image fit="cover" :src="orderInfo.firstImage" class="pic">
							<div slot="placeholder" class="image-slot">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
						<div class="wz">
							<p>订单：{{ orderInfo.orderCode }}</p>
							<p>游戏名：{{ orderInfo.goodTitle.slice(0, 20)+'...' }}</p>
							<p>游戏区：{{ orderInfo.goodPath }}</p>
						</div>
					</li>
					<li class="unlock-code">
						<p>您的解锁码为：</p>
						<div class="code">
							<a>{{ clipCont }}</a>
							<button v-clipboard:copy="clipCont" 
								v-clipboard:success="clipboardRes" 
								v-clipboard:error="clipboardErr">复制解锁码</button>
						</div>
						<div class="ti">
							<p>时间：{{ orderInfo.startTime | formatDateTime }} ━━━━ {{ orderInfo.endTime | formatDateTime }}</p>
							<a @click="toBuyerOrder">查看订单详情</a>
						</div>
					</li>
				</ul>
			</div>
			<div class="learn-cont">
				<h2>上号教程，上号必看！！</h2>
				<h3><em>1</em>复制解锁码，下载上号器<a class="download" href="https://img.myzuhao.top/%E8%9A%82%E8%9A%81%E4%B8%8A%E5%8F%B7%E5%99%A8%E5%AE%89%E8%A3%85%E5%8C%85472.exe" download="蚂蚁上号器安装包.exe">上号器下载</a></h3>
				<img src="@/assets/learn1.png">
				<h4><span class="s1">重要！先</span>打开对应的游戏客户端，<span class="s1">后</span>打开上号器</h4>
				<span class="s2">（先后顺序很重要）</span>
				<h3><em>2</em>粘贴解锁码（按<span class="s1">Ctrl+V粘贴</span>到上号器中）</h3>
				<img class="i1" src="@/assets/learn2.png">
				<h3><em>3</em>点击启动游戏，等待自动输入帐号密码</h3>
				<img class="i1" src="@/assets/learn3.png">
			</div>
		</div>
		
		<el-dialog custom-class="pay-dialog" title="温馨提示" :visible.sync="dialogVisible" width="500px">
			<p><img src="@/assets/notice.png" alt="icon">请先打开对应游戏客户端，再下载上号器上号（解锁码粘贴到上号器请按键盘Ctrl+V）</p>
			<div slot="footer">
				<el-button type="danger" class="danger"  @click="dialogVisible = false">我已打开游戏客户端</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data () {
		return {
			dialogVisible: false,
			clipCont: '',
			orderInfo: {
				goodTitle: ''
			}
		}
	},
	created() {
		this.$api.post('OrderDetails', this.$route.query.orderCode)
			.then(res => {
				this.orderInfo = res.obj;
				this.clipCont = this.orderInfo.goodLoginString;
				this.dialogVisible = true;
			});
	},
	methods: {
		toBuyerOrder () {
			this.$router.push({path: '/account/order-detail', query: {orderCode : this.orderInfo.orderCode}});
		},
		clipboardRes () {
			this.$notify({
				title: '复制成功',
				message: `请核对解锁码：${this.clipCont}`
			});
		},
		clipboardErr () {
			this.$notify({
				title: '网络繁忙',
				message: '请手动复制解锁码'
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.payment {
		padding-bottom: 30px;
	}
	.payment-main {
		padding: 50px;
		box-sizing: border-box;
	}
	.payment-info {
		h2 {
			display: flex;
			justify-content: center;
			align-items: center;
			color: #66b54e;
			font-size: 25px;
			font-weight: bold;
			img {
				margin-right: 20px;
			}
			span {
				padding: 0 5px;
				color: #ef0000;
			}
		}
	}
	.game-info {
		display: flex;
		margin-top: 30px;
		li {
			width: 50%;
			padding: 15px 30px;
			background: #f9f9f9;
			box-sizing: border-box;
			p {
				padding: 7px 0;
			}
		}
	}
	.game-cont {
		display: flex;
		align-items: center;
		border-right: 3px solid #fff;
		.pic {
			width: 100px;
			height: 100px;
			margin-right: 15px;
			border-radius: 5px;
		}
	}
	.unlock-code {
		button {
			padding: 0 15px;
			margin: 10px 0;
			background: #fff;
			border: 1px solid #dcdee2;
			color: #2b85e4;
			font-size: 12px;
			line-height: 30px;
			border-radius: 30px;
			transition: all .3s;
			&:hover {
				border-color: #2b85e4;
				color: #2b85e4;
			}
		}
		.code {
			display: flex;
			align-items: center;
			a {
				margin-right: 20px;
				font-size: 20px;
			}
		}
		.ti {
			display: flex;
			a {
				padding: 7px 0;
				color: #ef0000;
				margin-left: 20px;
				text-decoration: underline;
				cursor: pointer;
			}
		}
	}
	.learn-cont {
		padding-top: 50px;
		h2 {
			color: #ff5b5c;
			font-size: 34px;
			font-weight: bold;
			line-height: 1.3;
		}
		h3 {
			margin: 30px 0 20px;
			font-size: 32px;
			line-height: 1.3;
			font-weight: bold;
			em {
				width: 35px;
				margin-right: 20px;
				color: #fff;
				line-height: 35px;
				text-align: center;
				background: #ff5b5c;
				border-radius: 50%;
			}
		}
		.download {
			padding: 10px 20px;
			margin-left: 30px;
			color: #fff;
			font-size: 28px;
			background: #409EFF;
			border-radius: 3px;
			cursor: pointer;
		}
		h4 {
			margin-top: 20px;
			font-size: 30px;
			font-weight: bold;
			line-height: 1.3;
		}
		.s1 {
			color: #ff5b5c;
		}
		.s2 {
			padding-left: 80px;
			color: #ff5b5c;
			font-size: 22px;
			font-weight: bold;
			line-height: 1.3;
		}
		.i1 {
			margin-left: 60px;
		}
	}
	.pay-dialog {
		img {
			margin-right: 5px;
		}
		p {
			color: red;
			line-height: 1.5;
		}
	}
</style>


