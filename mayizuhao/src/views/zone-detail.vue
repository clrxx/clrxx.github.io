<template>
	<div class="zone-datail">
		<div class="zone-datail-main wh-1300">
			<div class="zone-datail-see">
				<div class="zone-see-swiper">
					<div class="swiper-container gallery-swiper">
						<div class="swiper-wrapper">
							<div v-for="item in zoneDot.imageUrls" :key="item" class="swiper-slide">
								<img :src="item" alt="pic">
							</div>
						</div>
					</div>
					<div class="swiper-container gallery-thumbs">
						<div class="swiper-wrapper">
							<div v-for="item in zoneDot.imageUrls" :key="item" class="swiper-slide">
								<img :src="item" alt="pic">
							</div>
						</div>
					</div>
					<div class="swiper-button-next swiper-button-white"></div>
					<div class="swiper-button-prev swiper-button-white"></div>
				</div>
				<div class="zone-see-ill">
					<div class="ill-pic">
						<img :src="zoneDot.images" alt="pic">
						<p>{{ zoneDot.summary }}</p>
					</div>
					<div class="ill-way">
						<h3>{{ zoneDot.name }}</h3>
						<h4>每次试玩最多三小时，结束后可再次试玩</h4>
						<div class="lease">租赁时间：
							<el-select v-model="LeaseNum" size="small" placeholder="选择租赁时间">
								<el-option v-for="item in Lease" :key="item" :label="item" :value="item" />
							</el-select>
						</div>
						<button @click="freePlay">免费玩</button>
					</div>
				</div>
			</div>
			<div class="zone-datail-cont">
				<null-data v-if="!zoneDot.html" />
				<div v-html="zoneDot.html"></div>
			</div>
		</div>
		<transition name="el-fade-in">
			<div v-if="isShowMask" @click="hideMaskFn" class="zone-mask">
				<div @click.stop class="zone-mask-main">
					<img src="@/assets/z-dot-is-qt.png">
					<input v-model="internetName" placeholder="请输入网吧名称" />
					<img @click="putInternetName" class="btn" src="@/assets/z-dot-is-btn.png">
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
import Swiper from "swiper";
import 'swiper/dist/css/swiper.min.css';
export default {
	data () {
		return {
			zoneDot: {},
			isShowMask: false,
			internetName: '',
			Lease: [1, 2, 3],
			LeaseNum: 1
		}
	},
	created () {
		this.$api.post('GoodOrderSpc_GetInfo', this.$route.query.zoneId)
			.then(res => {
				this.zoneDot = res.obj;

				this.$nextTick().then(()=> {
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
		toPaymentDetail () {
			this.$api.post('GoodOrderSpc_CreateOrder', {
				id: this.$route.query.zoneId,
				count: this.LeaseNum
			}).then(res => {
				this.$router.push({path: '/payment', query: {orderCode: res.obj.orderCode}});
			})
		},
		freePlay () {
			this.$api.postAll('CheckWangbaInfo')
				.then(res => {
					if (res.flag) {
						this.toPaymentDetail();
					} else {
						this.isShowMask = true;
						document.documentElement.style.overflow = 'hidden';
					}
				})
		},
		putInternetName () {
			if (!this.internetName) {
				this.$notify({
					title: '温馨提示',
					message: '请输入网吧名称'
				});
				return false;
			}
			this.$api.post('AddWangbaInfo', JSON.stringify(this.internetName)).then(res => {
				this.$notify({
					title: '温馨提示',
					message: '网吧名称提交成功'
				});
				setTimeout(() => {
					this.$router.push('/');
				}, 1000)
			})	
		},
		hideMaskFn () {
			this.isShowMask = false;
			document.documentElement.style.overflow = 'auto';
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
		height: 450px;
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
		top: 90% !important;
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
			height: 210px;
			object-fit: cover;
		}
		p {
			margin-top: 10px;
			color: #ffffff;
			font-size: 14px;
			line-height: 1.3;
			text-align: justify;
			word-break: break-all;
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
		position: relative;
		width: 900px;
		height: 500px;
		input {
			position: absolute;
			bottom: 170px;
			left: 50%;
			width: 300px;
			height: 50px;
			padding: 0 10px;
			border: none;
			outline: none;
			font-size: 18px;
			border-radius: 5px;
			transform: translateX(-50%);
		}
		.btn {
			position: absolute;
			bottom: 20px;
			left: 50%;
			transform: translateX(-50%);
		}
	}
</style>
