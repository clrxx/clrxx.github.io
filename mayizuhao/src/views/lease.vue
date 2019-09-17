<template>
	<div class="lease bc-f5f7f9">
		<div class="lease-main wh-1300">
			<div class="lease-see white-radius">
				<div class="lease-swiper">
					<div class="gallery-box">
						<div class="swiper-container gallery-swiper swiper-no-swiping">
							<div class="swiper-wrapper">
								<div v-for="(item, index) in goodsInfo.imageUrl" :key="index" class="swiper-slide">
									<img-zoom :src="item" :bigsrc="item" width="460" height="460" :configs="configs"></img-zoom>
								</div>
							</div>
						</div>
					</div>
					<div class="swiper-container gallery-thumbs">
						<div class="swiper-wrapper">
							<div v-for="(item, index) in goodsInfo.imageUrl" :key="index" class="swiper-slide">
								<el-image fit="cover" :src="item">
									<div slot="placeholder" class="image-slot">
										<i class="el-icon-picture-outline"></i>
									</div>
								</el-image>
							</div>
						</div>
					</div>
					<div class="swiper-button-next swiper-button-white"></div>
					<div class="swiper-button-prev swiper-button-white"></div>
				</div>
				<div class="lease-utl">
					<div class="tion">
						<h3>{{ goodsInfo.name }}</h3>
						<h4>游戏区服：{{ goodsInfo.goodType.path }}</h4>
						<h4>上号方式：{{ goodsInfo.goodLoginStr }}</h4>
					</div>
					<ul class="dur">
						<li @click="zuMayFn(1)" :class="{active: zuMayId == 1}">
							<span>时租</span>
							<p>{{ goodsInfo.price.price }}元/时</p>
						</li>
						<li v-if="goodsInfo.price.baoTian" @click="zuMayFn(2)" :class="{active: zuMayId == 2}">
							<span>包天</span>
							<p>{{ goodsInfo.price.baoTianPrice }}元/天</p>
						</li>
					</ul>
					<div class="int">
						<p>押金：{{ goodsInfo.depositPrice }}元</p>
						<p>起租时间：{{ goodsInfo.price.minCount }}小时起租</p>
						<div class="am">租赁时长：<el-input-number v-model="leaseNum" @change="countChange" :min="leaseMinNum" :max="leaseMaxNum" /></div>
						<el-button type="danger" @click="toLeaseOrder">立即租用/在架</el-button>
						<el-button v-if="isSpread && isShowLtc == '绝地求生'" @click="toZone" class="fc">免费玩此游戏</el-button>
					</div>
				</div>
			</div>
			<div class="lease-info white-radius">
				<el-tabs v-model="tabsActive">
					<el-tab-pane label="帐号信息" name="1">
						<div class="info-main">
							<ul class="act">
								<li v-for="(item, key) in goodsInfo.tags" :key="key">
									<h3>{{ key }}：</h3>
									<p>{{ item }}</p>
								</li>
							</ul>
							<!-- 判断显示 start -->
							<!-- <div v-if="isShowLtc == '英雄联盟' || isShowLtc == '穿越火线'" class="bar"><em></em>账号概要</div>
							<ul v-if="isShowLtc == '英雄联盟'" class="syn">
								<li>
									<img src="@/assets/so5.png" width="231" height="136" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>单双排位段位</h4>
									</div>
								</li>
								<li>
									<img src="@/assets/so5.png" width="231" height="136" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>灵活排位段位</h4>
									</div>
								</li>
								<li>
									<img src="@/assets/so3.png" width="191" height="148" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>皮肤数量</h4>
									</div>
								</li>
								<li>
									<img src="@/assets/so6.png" width="101" height="148" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>英雄数量</h4>
									</div>
								</li>
							</ul>
							<ul v-if="isShowLtc == '穿越火线'" class="syn">
								<li>
									<img src="@/assets/so1.png" width="231" height="92" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>王者级道具数</h4>
									</div>
								</li>
								<li>
									<img src="@/assets/so2.png" width="231" height="82" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>英雄级道具数</h4>
									</div>
								</li>
								<li>
									<img src="@/assets/so3.png" width="191" height="148" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>套装</h4>
									</div>
								</li>
								<li>
									<img src="@/assets/so4.png" width="148" height="146" alt="pic">
									<div class="wz">
										<h3>66</h3>
										<h4>目前等级</h4>
									</div>
								</li>
							</ul> -->
							<!-- end -->
							<div class="bar"><em></em>账号描述</div>
							<div class="des">
								<p>{{ goodsInfo.summary }}</p>
							</div>
							<div class="bar"><em></em>账号截图</div>
							<div class="lease-carousel">
								<el-carousel trigger="click" :interval="5000">
									<el-carousel-item v-for="(item, index) in goodsInfo.imageUrl" :key="index">
										<el-image fit="cover" :src="item">
											<div slot="placeholder" class="image-slot">
												<i class="el-icon-picture-outline"></i>
											</div>
										</el-image>
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="租号须知" name="2">
						<div class="info-data">
							租号须知 --- 会有很长很长一段文档
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
	</div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/dist/css/swiper.min.css';
import imgZoom from 'vue2.0-zoom';
export default {
	components: {
		imgZoom
	},
	data () {
		return {
			goodsInfo: {
				goodType: {},
				price: {},
				user: {}
			},
			isSpread: false,
			tagsInfo: [],
			zuMayId: 1,
			leaseNum: 1,
			leaseMinNum: 1,
			leaseMaxNum: 1000,

			tabsActive: '1',
			isShowLtc: '',

			configs: {
				width: 650,
				height: 350,
				maskWidth: 100,
				maskHeight: 100,
				maskColor: 'red',
				maskOpacity: 0.3
			}
		}
	},
	created () {
		this.$api.post('CheckSpreadCode', JSON.stringify(sessionStorage.getItem('spreadCode')))
			.then(res => {
				this.isSpread = true;
			});
		this.$api.post('GoodInfo', {
			code: this.$route.query.leaseId,
			res: this.$route.query.resId
		}).then(res => {
			this.goodsInfo = res.obj;
			this.leaseNum = this.goodsInfo.price.minCount;
			this.leaseMinNum = this.goodsInfo.price.minCount;
			if (this.goodsInfo.price.maxCount > 0) this.leaseMaxNum = this.goodsInfo.price.maxCount;
			this.isShowLtc = (this.goodsInfo.goodType.path).split('_')[2];

			this.$nextTick().then(() => {
				var galleryThumbs = new Swiper('.gallery-thumbs', {
					spaceBetween: 10,
					slidesPerView: 5,
					watchSlidesVisibility: true
				});
				var gallerySwiper = new Swiper('.gallery-swiper', {
					navigation: {
						nextEl: '.swiper-button-next',
						prevEl: '.swiper-button-prev',
					},
					thumbs: {
						swiper: galleryThumbs,
					}
				})
			})
		})
	},
	methods: {
		zuMayFn (e) {
			this.zuMayId = e;
		},
		countChange (e) {
			this.leaseNum = e;
		},
		toLeaseOrder () {
			// 默认小时
			let createOrder = {
				goodCode: this.goodsInfo.code,
				userID: this.goodsInfo.user.id,
				res: this.goodsInfo.res,
				count: this.leaseNum,
				baotianFlag: false
			}
			// 包天
			if (this.zuMayId == 2) {
				createOrder.count = 0;
				createOrder.baotianFlag = true;
			}
			this.$api.post('CreateOrder', JSON.stringify(createOrder))
				.then(res => {
					let _data = res.obj;
					sessionStorage.setItem('leaseOrder', JSON.stringify({
						goodPath: _data.goodPath,
						createTime: _data.createTime,
						price: _data.price,
						leaseWay: (this.zuMayId == 2)? '天':'小时',
						goodLoginStr: _data.goodLoginStr,
						leaseTime: this.leaseNum,
						startTime: _data.startTime,
						endTime: _data.endTime,
						orderPrice:  (_data.price * this.leaseNum),
						deposit: _data.deposit,
						payPrice: _data.payPrice,
						orderCode: _data.orderCode
					}));
					this.$router.push('/lease-order');
				});
		},
		toZone () {
			this.$router.push('/zone');
		}
	}
}
</script>

<style lang="scss" scoped>
	.lease {
		padding-bottom: 30px;
	}
	.lease-see {
		display: flex;
		padding: 30px 20px;
		box-sizing: border-box;
	}
	.lease-swiper {
		flex-shrink: 0;
		position: relative;
		width: 460px;
		user-select: none;
	}
	.gallery-box {
		display: flex;
		align-items: center;
		background: #eee;
    	border: 1px solid #dedede;
		box-sizing: border-box;
	}
	.gallery-thumbs {
		width: 400px;
		height: 70px;
		margin-top: 10px;
		.swiper-slide {
			opacity: 0.4;
		}
		.swiper-slide-thumb-active {
			opacity: 1;
		}
	}
	.swiper-button-next, 
	.swiper-button-prev {
		top: 91.2% !important;
		height: 70px;
		background-color: #313030;
		background-size: 14px;
		box-sizing: border-box;
	}
	.swiper-button-next {
		right: 0;
	}
	.swiper-button-prev {
		left: 0;
	}
	.lease-utl {
		flex: 1;
		padding-left: 30px;
		.tion {
			padding-bottom: 30px;
			h3 {
				font-size: 16px;
				font-weight: 700;
				line-height: 1.5;
			}
			h4 {
				margin-top: 20px;
				color: #ff5f5f;
			}
		}
		.dur {
			display: flex;
			padding: 30px 0;
			border-top: 1px dashed #d9d9d9;
			border-bottom: 1px dashed #d9d9d9;
			li {
				width: 160px;
				margin-right: 10px;
				box-sizing: border-box;
				cursor: pointer;
				// &:hover p{
				// 	border-color: #ff5f5f;
				// }
				&.active p{
					border-color: #ff5f5f;
					color: #ff5f5f;
				}
			}
			span {
				width: 100%;
				padding: 10px 0;
				background: #ff5f5f;
				color: #fff;
				font-size: 16px;
				text-align: center;
			}
			p {
				padding: 20px 0;
				color: #d9d9d9;
				font-size: 16px;
				text-align: center;
				border: 1px solid #d9d9d9;
				border-top: none;
				transition: all .3s;
			}
		}
		.int {
			padding-top: 30px;
			p {
				margin-bottom: 20px;
			}
			.am {
				margin-bottom: 30px;
				.el-input-number {
					width: 150px;
				}
			}
			.el-button {
				padding: 15px 30px;
				font-size: 16px;
			}
			.fc {
				margin-left: 30px;
			}
		}
	}
	.lease-info {
		padding: 30px 20px;
		margin-top: 30px;
		box-sizing: border-box;
	}
	.info-main {
		padding: 20px 20px 0;
		.act {
			padding-bottom: 10px;
			li {
				display: flex;
				padding-bottom: 10px;
				h3 {
					flex-shrink: 0;
					width: 100px;
					padding-right: 5px;
					line-height: 1.3;
					text-align: right;
					font-weight: bold;
				}
				p {
					line-height: 1.3;
				}
			}
		}
		.bar {
			display: flex;
			align-items: center;
			padding: 10px 0;
			border-bottom: 1px solid #d9d9d9;
			color: #ff5f5f;
			font-size: 16px;
			em {
				width: 8px;
				height: 8px;
				margin-right: 8px;
				background: #ff5f5f;
				border-radius: 50%;
			}
		}
		.syn {
			display: flex;
			padding: 20px 0;
			li {
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				width: 25%;
				padding: 20px;
				background: rgba(247, 224, 211, .3);
				border: 10px solid #fff;
				box-sizing: border-box;
				h3 {
					margin-top: 10px;
					color: #de6438;
					font-size: 20px;
					font-weight: bold;
					text-align: center;
				}
				h4 {
					margin-top: 10px;
					text-align: center;
				}
			}
		}
		.des {
			padding: 20px 10px;
			box-sizing: border-box;
			p {
				line-height: 1.5;
			}
		}
	}
	.lease-carousel {
		width: 800px;
		height: 500px;
		padding-top: 30px;
		margin: 0 auto;
		.el-carousel {
			height: 100%;
		}
	}
</style>


