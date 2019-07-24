<template>
	<div class="zone-datail">
		<div class="zone-datail-main wh-1300">
			<div class="zone-datail-see">
				<div class="zone-see-swiper">
					<div class="swiper-container gallery-swiper">
						<div class="swiper-wrapper">
							<div v-for="item in 10" :key="item" class="swiper-slide">
								<img src="@/assets/hotgame3.jpg" alt="pic">
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
				<div class="zone-see-ill">
					<div>
						<img src="@/assets/hotgame3.jpg" alt="pic">
						<p>绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。</p>
					</div>
					<div>
						<h3>绝地求生</h3>
						<h4>每次试玩最多三小时，结束后可再次试玩</h4>
						<div class="lease">租赁时间：
							<el-select v-model="LeaseNum" size="small" placeholder="选择租赁时间">
								<el-option v-for="item in Lease" :key="item.value" :label="item.label" :value="item.value" />
							</el-select>
						</div>
						<button @click="freePlay">免费玩</button>
					</div>
				</div>
			</div>
			<div class="zone-datail-cont">
				<p>绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。绝地求生(PLAYERUNKNOWN’S BATTLEGROUNDS)是战术竞技类型的游戏，每一局游戏将有100名玩家参与，他们将被投放在绝地岛(battlegrounds)的上空，游戏开始跳伞时所有人都一无所有。
				111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
				<p><img src="@/assets/hotgame3.jpg" alt="pic"></p>
				<span>dsdsd1545</span>
				<h2>dsdsd1545</h2>
				<h6>dsdsd1545</h6>
			</div>
		</div>
		<transition name="el-fade-in">
			<div v-if="isShowMask" class="zone-mask">
				<div class="zone-mask-main">
					<img class="pic1" src="@/assets/dada1.jpg">
					<img class="pic2" src="@/assets/dada2.png">
					<input v-model="internetName" placeholder="请输入网吧（咖）名称" />
					<p>该网吧（咖）为特权试用阶段，填写网吧（咖）名称<br>我们将联系该网吧（咖）开通特权，永久畅玩</p>
					<img @click="putInternetName" class="btn" src="@/assets/dadabtn.png">
				</div>
			</div>
		</transition>
		<el-backtop></el-backtop>
	</div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/dist/css/swiper.min.css';
export default {
	data () {
		return {
			isShowMask: false,
			internetName: '',
			Lease: [{
				value: 1,
				label: 1
			}, {
				value: 2,
				label: 2
			}, {
				value: 3,
				label: 3
			}],
			LeaseNum: 1
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
		freePlay () {
			let zoneTm = localStorage.getItem('zoneTm');
			if (zoneTm == '' && zoneTm == null && zoneTm == undefined && zoneTm =='undefined') {
				document.documentElement.style.overflow = 'hidden';
				this.isShowMask = true;
			} else {
				let today = new Date().getTime();
				if (today > zoneTm) {
					document.documentElement.style.overflow = 'hidden';
					this.isShowMask = true;
				} else {
					this.toPaymentDetail();
				}
			}
		},
		putInternetName () {
			if (!this.internetName) {
				this.$notify.info({
					title: '温馨提示',
					message: '请输入网吧（咖）名称'
				});
			} else {
				this.isShowMask = false;
				document.documentElement.style.overflow = 'auto';
				let zoneTm = new Date().getTime() + (24*60*60*1000);
				localStorage.setItem('zoneTm', zoneTm);
				this.toPaymentDetail();
			}
		},
		toPaymentDetail () {
			this.$router.push({path: '/payment-detail', query: { id: 1 }});
		}
	}
}
</script>

<style lang="scss" scoped>
	.zone-datail {
		padding: 80px 0 50px;
		background: #182026;
	}
	.zone-datail-see {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		background: rgba(0, 0, 0, 0.5);
		box-sizing: border-box;
	}
	.zone-see-swiper {
		position: relative;
		width: 750px;
		user-select: none;
	}
	.gallery-swiper {
		height: 420px;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	.gallery-thumbs {
		width: 690px;
		height: 75px;
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
		top: 89.5% !important;
		height: 75px;
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
	.zone-see-ill {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 460px;
		img {
			width: 100%;
		}
		p {
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 3;
			word-break: break-all;
			margin-top: 10px;
			color: #ffffff;
			font-size: 14px;
			line-height: 1.3;
			text-align: justify;
		}
		h3 {
			color: #ff5b5b;
			font-size: 16px;
			line-height: 1.3;
		}
		h4 {
			margin-top: 20px;
			color: #ffbd4a;
			font-size: 19px;
			line-height: 1.3;
		}
		.lease {
			margin-top: 10px;
			color: #fff;
			font-size: 16px;
			.el-select {
				width: 100px;
			}
		}
		button {
			width: 100%;
			margin-top: 20px;
			background: #2eb2ff;
			border: none;
			color: #fff;
			font-size: 26px;
			line-height: 50px;
			text-align: center;
			border-radius: 3px;
			cursor: pointer;
		}
	}
	.zone-datail-cont {
		padding: 50px 30px;
		margin-top: 30px;
		background: rgba(0, 0, 0, 0.5);
		box-sizing: border-box;
		* {
			padding: 10px 0 !important;
			background: transparent !important;
			color: #bec3c7 !important;
			font-size: 14px !important;
			line-height: 1.5 !important;
			word-wrap: break-word !important;
			word-break: break-all !important;
		}
		h1, h2 ,h3, h4, h5, h6 {
			color: #fff !important;
			font-size: 16px !important;
		}
	}
	.zone-mask {
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1001;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .7);
	}
	.zone-mask-main {
		width: 900px;
		height: 500px;
		background: url("../assets/dadabg.png") no-repeat;
		text-align: center;
		.pic1 {
			margin-top: 30px;
		}
		.pic2 {
			margin-top: 30px;
		}
		input {
			width: 300px;
			height: 50px;
			padding: 0 10px;
			margin-top: 30px;
			border: none;
			outline: none;
			font-size: 18px;
			border-radius: 5px;
		}
		p {
			margin: 30px 0 50px;
			color: #fff;
			font-size: 14px;
			line-height: 1.3;
			letter-spacing: 1px;
		}
	}
</style>
