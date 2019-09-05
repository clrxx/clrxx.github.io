<template>
	<div class="zone">
		<div class="zone-main wh-1300">
			<div class="zone-bar">
				<h3>网吧游戏特权免费玩</h3>
				<h4>Steam特权、Origin、橘子特权平台、Uplay特权、暴雪特权..... 游戏免费畅玩！！！</h4>
			</div>
			<div class="zone-games">
				<ul class="zone-games-list">
					<li v-for="item in zoneInfo" :key="item.id">
						<router-link :to="{path: '/zone-detail', query: {zoneId: item.id}}">
							<img :src="item.imageUrl" :alt="item.name">
							<span>{{ item.name }}<em></em></span>
						</router-link>
					</li>
				</ul>
			</div>
			<div class="zone-message">
				<div class="title">
					<h3>我要反馈</h3>
				</div>
				<div class="cont clearfix">
					<h3>没有想要的游戏？在这里告诉我们。</h3>
					<textarea v-model="msgCont" placeholder="请输入你想玩的游戏..."></textarea>
					<button @click="sendMsg">发送</button>
				</div>
			</div>
			<div class="zone-comment">
				<div class="comment-title">
					<h3>最有价值的评论</h3>
				</div>
				<null-data v-if="comment.length == 0" />
				<ul class="comment-list">
					<li v-for="item in comment" :key="item.id">
						<div class="info">
							<img :src="item.userImg" alt="pic">
							<span>{{ item.userName }}</span>
						</div>
						<div class="cont">
							<h3>发布于：{{ item.createTimeStr }}</h3>
							<p>{{ item.content }}</p>
							<div class="cmit">
								<div class="or">
									<h4>这篇评论您赞同么？</h4>
									<span @click="upComment(item.id, item.upFlag, item.downFlag)" :class="{ active: item.upFlag }"><i class="el-icon-thumb" />是</span>
									<span @click="downComment(item.id, item.upFlag, item.downFlag)" :class="{ active: item.downFlag }"><i class="el-icon-thumb d" />否</span>
								</div>
								<div class="num">{{ item.upCount }}人赞同</div>
							</div>
						</div>
					</li>
				</ul>
				<div v-if="comment.length > 0" class="pagination">
					<el-pagination :total="pageTotal" :page-size="pageSize" :current-page="pageCurrent" @current-change="pageChange" background layout="prev, pager, next" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			zoneInfo: [],
			msgCont: '',
			comment: [],

			pageTotal: 10,
			pageSize: 10,
			pageCurrent: 1
		}
	},
	created () {
		this.$api.post('GoodPlatformPage', {
			itemCount: 50,
			pageIndex: 0
		}).then(res => {
			this.zoneInfo = res.obj.obj;
		})
		this.mAjax();
	},
	methods: {
		mAjax () {
			this.$api.post('CommentPage', {
				itemCount: this.pageSize,
				pageIndex: (this.pageCurrent - 1)
			}).then(res => {
				this.comment = res.obj.obj;
				this.pageTotal = res.obj.allItemCount;
			})
		},
		sendMsg () {
			if (!this.msgCont) {
				this.$notify({
					title: '温馨提示',
					message: '请输入你想玩的游戏'
				});
			} else if (this.msgCont.length < 10 || this.msgCont.length > 200) {
				this.$notify({
					title: '温馨提示',
					message: '请控制字数在10~200之间'
				});
			} else {
				this.$api.post('AddComment', JSON.stringify(this.msgCont))
					.then(res => {
						this.$notify({
							title: '温馨提示',
							message: '评论成功'
						});
						this.msgCont = '';
					})
			}
		},
		upComment (id, up, down) {
			if (!up && !down) {
				this.$api.post('UpComment', id)
					.then(res => {
						this.$notify({
							title: '温馨提示',
							message: '已赞同'
						});
						this.mAjax();
					})
			} else if (up && !down) {
				this.$api.post('CancelUpComment', id)
					.then(res => {
						this.$notify({
							title: '温馨提示',
							message: '已取消赞同'
						});
						this.mAjax();
					})
			} else if (!up && down) {
				this.$notify({
					title: '温馨提示',
					message: '你已否定过这条评论'
				});
			}
		},
		downComment (id, up, down) {
			if (!up && !down) {
				this.$api.post('DownComment', id)
					.then(res => {
						this.$notify({
							title: '温馨提示',
							message: '已否定'
						});
						this.mAjax();
					})
			} else if (!up && down) {
				this.$api.post('CancelDownComment', id)
					.then(res => {
						this.$notify({
							title: '温馨提示',
							message: '已取消否定'
						});
						this.mAjax();
					})
			} else if (up && !down) {
				this.$notify({
					title: '温馨提示',
					message: '你已赞同过这条评论'
				});
			}
		},
		pageChange (e) {
			this.pageCurrent = e;
			this.mAjax();
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
				border-bottom-left-radius: 5px; 
			}
			em {
				position: absolute;
				top: 0;
				left: -19px;
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
					border-radius: 3px;
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
					margin: 30px 0 20px;
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
						color: #fff;
						font-size: 14px;
						cursor: pointer;
						i {
							margin-right: 3px;
						}
						.d {
							transform: rotateZ(180deg);
						}
						&.active {
							color: #1ca2e9;
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
