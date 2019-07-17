<template>
	<div class="zone">
		<div class="zone-main wh-1300">
			<div class="zone-bar">
				<h3>网吧游戏特权免费玩</h3>
				<h4>Steam特权、Origin、橘子特权平台、Uplay特权、暴雪特权 .....游戏免费畅玩！！！</h4>
			</div>
			<div class="zone-games">
				<ul class="zone-games-list">
					<li v-for="i in 10" :key="i">
						<router-link :to="{path: '/zone-detail', query: {id: 1}}">
							<img src="@/assets/hotgame3.jpg" alt="pic">
							<span>英雄联盟<em></em></span>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="zone-message">
				<div class="title">
					<h3>我要反馈</h3>
				</div>
				<div class="cont clearfix">
					<h3>没有想要的游戏？在这里告诉我们</h3>
					<textarea placeholder="请输入你想玩的游戏..."></textarea>
					<button>发送</button>
				</div>
			</div>
			<div class="zone-comment">
				<div class="comment-title">
					<h3>最有价值的评论</h3>
				</div>
				<ul class="comment-list">
					<li v-for="i in 10" :key="i">
						<div class="info">
							<img src="https://i.loli.net/2018/12/31/5c2a12b316137.png" alt="pic">
							<span>181****7075</span>
						</div>
						<div class="cont">
							<h3>发布于：2019-05-16 01:59:04</h3>
							<p>建议上鬼泣，希望蚂蚁专区越来越棒！！！</p>
							<div class="cmit">
								<div class="or">
									<h4>这篇评论您赞同么？</h4>
									<span><i class="el-icon-thumb" />是</span>
									<span class="active"><i class="el-icon-thumb d" />否</span>
								</div>
								<div class="num">6人赞同</div>
							</div>
						</div>
					</li>
				</ul>
				<el-pagination :total="20" :page-size="10" :current-page="1" @current-change="pageChange" background layout="prev, pager, next" />
			</div>
		</div>
		<el-backtop></el-backtop>
	</div>
</template>

<script>
export default {
	data () {
		return {
			pageTotal: 20,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	methods: {
		pageChange (e) {
			console.log(e)
		}
	}
}
</script>

<style lang="scss" scoped>
	.zone {
		background: #182026;
	}
	.zone-bar {
		padding: 80px 0 50px;
		h3 {
			margin-bottom: 30px;
			color: #fff;
			font-size: 45px;
			font-weight: 700;
			text-align: center;
		}
		h4 {
			color: #fff;
			font-size: 30px;
			font-weight: 700;
			text-align: center;
		}
	}
	.zone-games-list {
		display: flex;
		flex-wrap: wrap;
		li {
			width: 25%;
			padding: 0 10px 30px;
			box-sizing: border-box;
			a {
				position: relative;
				overflow: hidden;
				width: 100%;
				height: 160px;
				border-radius: 5px;
				cursor: pointer;
				&:hover img{
					transform: scale(1.05);
				}
			}
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				transition: all .5s;
			}
			span {
				position: absolute;
				top: 0;
				right: 0;
				padding: 0 10px;
				background: #5abaf7;
				color: #fff;
				line-height: 22px;
				font-size: 12px;
				border-bottom-left-radius: 3px; 
			}
			em {
				position: absolute;
				top: 0;
				left: -20px;
				width: 0;
				height: 0;
				border-top: 20px solid #5abaf7;
				border-left: 20px solid transparent;
			}
		}
	}
	.zone-message {
		padding-top: 50px;
		.title {
			padding: 20px 0;
			h3 {
				color: #fff;
				font-size: 28px;
				text-align: center;
			}
		}
		.cont {
			background: rgba(0, 0, 0, .4);
			h3 {
				border-bottom: 2px solid #fff;
				color: #fff;
				font-size: 28px;
				line-height: 60px;
				text-align: center;
			}
			textarea {
				width: 100%;
				height: 200px;
				padding: 20px 60px;
				background: transparent;
				border: none;
				outline: none;
				resize: none;
				color: #fff;
				font-size: 18px;
				box-sizing: border-box;
			}
			button {
				float: right;
				width: 100px;
				margin: 0 30px 10px 0;
				background: #2eb2ff;
				border: none;
				color: #fff;
				font-size: 20px;
				line-height: 35px;
				text-align: center;
				border-radius: 35px;
			}
		}
	}
	.zone-comment {
		padding-bottom: 50px;
		.comment-title {
			padding: 20px 10px 15px;
			border-bottom: 2px solid #1ca2e9;
			h3 {
				color: #fff;
				font-size: 19px;
				font-weight: 400;
			}
		}
		.comment-list {
			background: #21272f;
			li {
				display: flex;
				padding: 20px 0 10px 30px;
			}
			.info {
				display: flex;
				align-items: flex-start;
				flex-shrink: 0;
				img {
					width: 64px;
					height: 64px;
					object-fit: cover;
				}
				span {
					overflow: hidden;
					width: 150px;
					padding: 0 30px 0 10px;
					color: #fff;
					font-size: 17px;
					line-height: 1;
					white-space: nowrap;
					text-overflow: ellipsis;
					box-sizing: border-box;
				}
			}
			.cont {
				flex: 1;
				h3 {
					color: #878787;
					font-size: 13px;
					line-height: 1.5;
				}
				p {
					margin: 40px 0 20px;
					color: #fff;
					font-size: 17px;
					line-height: 1.3;
				}
				.cmit {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px 0 ;
					border-top: 2px solid #878787;
				}
				.or {
					display: flex;
					align-items: center;
					h4 {
						color: #878787;
						font-size: 13px;
					}
					span {
						display: flex;
						align-items: center;
						padding: 3px 5px;
						margin: 0 10px;
						background: #474954;
						color: #1ca2e9;
						font-size: 14px;
						cursor: pointer;
						i {
							margin-right: 3px;
						}
						.d {
							transform: rotateZ(180deg);
						}
						&.active {
							color: #fff;
						}
					}
				}
				.num {
					padding-right: 20px;
					color: #878787;
					font-size: 13px;
				}
			}
		}
	}
</style>
