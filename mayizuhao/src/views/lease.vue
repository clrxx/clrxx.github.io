<template>
	<div class="lease bc-f5f7f9">
		<div class="lease-main wh-1300">
			<div class="lease-see white-radius">
				<div class="lease-swiper">
					<div class="gallery-box">
						<div class="swiper-container gallery-swiper swiper-no-swiping">
							<div class="swiper-wrapper">
								<div v-for="item in 10" :key="item" class="swiper-slide">
									<img-zoom src="http://files.xubei.com/demon/44c42aabc8a34eda995706f504c3728c.png" bigsrc="http://files.xubei.com/demon/44c42aabc8a34eda995706f504c3728c.png" :configs="configs" width="100%"></img-zoom>
								</div>
							</div>
						</div>
					</div>
					<div class="swiper-container gallery-thumbs">
						<div class="swiper-wrapper">
							<div v-for="item in 10" :key="item" class="swiper-slide">
								<img src="@/assets/hotgame3.jpg" alt="pic">
							</div>
						</div>
					</div>
					<div class="swiper-button-next swiper-button-white"></div>
					<div class="swiper-button-prev swiper-button-white"></div>
				</div>
				<div class="lease-utl">
					<div class="tion">
						<h3>冠军之刃地下拳王金牌主播原计划剑圣和劫帝王斑蝶冠军之刃地下拳王金牌主播原计划剑圣和劫帝王斑蝶冠军之刃地下拳王金牌主播原计划剑圣和劫帝王斑蝶</h3>
						<h4>游戏区服：xxxxx</h4>
						<h4>上号方式：上号器上号</h4>
					</div>
					<ul class="dur">
						<li class="active">
							<span>时租</span>
							<p>1元/时</p>
						</li>
						<li>
							<span>包天</span>
							<p>20元/天</p>
						</li>
					</ul>
					<div class="int">
						<p>押金：0.00元</p>
						<p>起租时间：1小时起租</p>
						<div class="am">租赁时长：<el-input-number v-model="leaseNum" @change="countChange" :min="1" :max="100" /></div>
						<el-button type="danger" @click="toLeaseOrder">立即租用/在架</el-button>
						<el-button v-if="isShowLtc == '绝地求生'" @click="toZone" class="fc">免费玩此游戏</el-button>
					</div>
				</div>
			</div>
			<div class="lease-info white-radius">
				<el-tabs v-model="tabsActive">
					<el-tab-pane label="帐号信息" name="1">
						<div class="info-main">
							<ul class="act">
								<li>
									<h3>英雄级道具数：</h3>
									<p>50</p>
								</li>
								<li>
									<h3>主武器：</h3>
									<p>xk，50V4烈+死亡+葵+王者瞳,幻兽系列，狙击（毁灭加天龙+极光），英雄步枪（千变加火麒麟+无影+超新星加黑骑士）王者★炫金火麒麟★炫金骑士★炫金修罗★烈龙悦心★裁决★死神★黑骑士★雷神★龙啸★稳定不挤号老板玩的开心</p>
								</li>
							</ul>
							<!-- 判断显示 start -->
							<!-- 英雄联盟 -->
							<div v-if="isShowLtc == '英雄联盟' || isShowLtc == '穿越火线'" class="bar"><em></em>账号概要</div>
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
							<!-- 穿越火线 -->
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
							</ul>
							<!-- end -->
							<div class="bar"><em></em>账号描述</div>
							<div class="des">
								<p>王者★炫金火麒麟★炫金骑士★炫金修罗★烈龙悦心★裁决★死神★黑骑士★雷神★龙啸★稳定不挤号老板玩的开心王者★炫金火麒麟★炫金骑士★炫金修罗★烈龙悦心★裁决★死神★黑骑士★雷神★龙啸★稳定不挤号老板玩的开心</p>
							</div>
							<div class="bar"><em></em>账号截图</div>
							<div class="lease-carousel index-carousel">
								<el-carousel trigger="click" :interval="5000" height="380px">
									<el-carousel-item v-for="item in 4" :key="item">
										<img src="https://img.myzuhao.top/5cdbab19b8bed69358.png" alt="pic">
									</el-carousel-item>
								</el-carousel>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="租号须知" name="2">
						<div class="info-data">
							租号须知
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<el-backtop></el-backtop>
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
			leaseNum: 1,
			tabsActive: '1',
			isShowLtc: '绝地求生',
			configs: {
				width: 650,
				height: 350,
				maskWidth: 100,
				maskHeight: 100,
				maskColor: 'red',
				maskOpacity: 0.2
			}
		}
	},
	mounted () {
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
	},
	methods: {
		countChange (e) {
			console.log(e);
		},
		toLeaseOrder () {
			this.$router.push({path: '/lease-order', query: { id: 0 }});
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
		height: 460px;
		background: #eee;
    	border: 1px solid #dedede;
		box-sizing: border-box;
	}
	.gallery-swiper {
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
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
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
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
				&:hover p{
					border-color: #ff5f5f;
				}
				&.active p{
					border-color: #ff5f5f;
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
				color: #ff5f5f;
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
		width: 840px;
		padding-top: 30px;
		margin: 0 auto;
		img {
			width: 100%;
		}
	}
</style>


