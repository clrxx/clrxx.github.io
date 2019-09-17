<template>
	<div class="dispute">
		<div class="dispute-order white-radius">
			<div class="account-title-small">
				<el-page-header @back="$router.back()" :content="headCont" />
			</div>
			<ul class="dispute-order-info">
				<li><span>订单编号：</span>{{ orderInfo.orderCode }}</li>
				<li><span>订单状态：</span>{{ orderInfo.stateStr }}</li>
				<li><span>商品金额：￥{{ orderInfo.goodPrice }}（不含押金）</span></li>
				<li><span>下单时间：{{ orderInfo.createTime | formatDateTime }}</span></li>
			</ul>
		</div>
		<div class="dispute-step white-radius">
			<div class="account-title-small">
				<h3>维权流程</h3>
			</div>
			<el-steps :active="stepActive" align-center finish-status="success">
				<el-step title="申请维权" description="填写维权理由和退款金额"></el-step>
				<el-step title="维权仲裁"></el-step>
				<el-step title="维权结果"></el-step>
			</el-steps>
			<div class="dispute-step-cont">
				<div v-if="stepActive == 0" class="step-1">
					<ul class="account-puc-list">
						<li>
							<label>维权金额：</label>
							<el-input v-model="payMoney" size="small" placeholder="请输入金额" class="wh-200"></el-input>
						</li>
						<li>
							<label>维权原因：</label>
							<el-select v-model="causeValue" @change="causeChange" size="small" placeholder="请选择原因">
								<el-option v-for="item in causeOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</li>
						<li>
							<label>联系方式：</label>
							<el-input v-model="contact" size="small" placeholder="请输入联系方式"></el-input>
						</li>
						<li>
							<label>维权内容：</label>
							<el-input
								type="textarea"
								:rows="3"
								placeholder="请输入内容"
								v-model="causeTextarea">
							</el-input>
						</li>
						<li>
							<label>图片：</label>
							<el-upload
								multiple
								accept=".jpg,.jpeg,.png"
								list-type="picture-card"
								:action="upImgUrl"
								:limit="10"
								:before-upload="beforeUpload"
								:on-success="uploadSuccess"
								:on-exceed="uploadExceed"
								:on-preview="uploadPictureCardPreview"
								:on-remove="uploadRemove">
								<i class="el-icon-plus"></i>
								<div slot="tip" class="el-upload__tip">已上传图片<span class="color-success">{{ uploadImg.length }}</span>/10张，每张图片最大支持1M，仅支持jpg/jpeg/png格式</div>
							</el-upload>
							<el-dialog :visible.sync="dialogVisible">
								<img width="100%" :src="dialogImageUrl" alt="pic">
							</el-dialog>
						</li>
						<li><label></label>
							<el-button @click="putDispute" type="primary" size="small">提交申请</el-button>
						</li>
					</ul>
				</div>
				<div v-if="stepActive == 2 || stepActive == 3" class="step-2">
					<h3>维权记录</h3>
					<ul v-if="stepActive == 3" class="cont">
						<li>客服回复：{{ causeInfo.replyContent }}</li>
						<li>处理结果：{{ causeInfo.stateStr }}</li>
					</ul>
					<ul class="cont">
						<li>于创建维权申请</li>
						<li>维权原因：{{ causeInfo.reason }}</li>
						<li>申请退款金额：￥{{ causeInfo.applyPrice }}</li>
						<li>申请说明：{{ causeInfo.summary }}</li>
					</ul>
					<div class="mn">维权金额：<span>￥{{ causeInfo.applyPrice }}</span></div>
					<ul class="dispute-order-info bd">
						<li><span>创建时间：</span>{{ causeInfo.createTime | formatDateTime }}</li>
						<li><span>订单状态：</span>{{ causeInfo.stateStr }}</li>
						<li v-if="causeInfo.state == 2"><span>退款金额：</span>{{ causeInfo.refundPrce }}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { upImgUrl } from '@/common/api'
export default {
	data () {
		return {
			upImgUrl,
			headCont: '',
			orderInfo: {},
			stepActive: -1,
			payMoney: 0,
			causeValue: '',
			causeIndex: 0,
			contact: '',
			causeTextarea: '',
			causeOptions: [
				{
					id: 1,
					name: '其他问题'
				}, {
					id: 2,
					name: '账号信息与描述不符'
				}, {
					id: 4,
					name: '账号被封'
				}, {
					id: 7,
					name: '密码错误导致无法登陆'
				}, {
					id: 8,
					name: '账号在线或顶号导致无法正常游戏'
				}, {
					id: 10,
					name: '异地或锁定导致无法登陆'
				}, {
					id: 27,
					name: '开外挂'
				}
			],
			uploadImg: [],
        	dialogVisible: false,
			dialogImageUrl: '',

			causeInfo: {}
		}
	},
	created () {
		this.cAjax();
	},
	methods: {
		cAjax () {
			this.$api.post('OrderDetails', this.$route.query.orderCode)
				.then(res => {
					this.orderInfo = res.obj;
					this.payMoney = res.obj.goodPrice;
					if (this.orderInfo.state == 5) {
						this.stepActive = 2;
						this.headCont = '维权仲裁';
						this.mAjax();
					} else if (this.orderInfo.state == 6) {
						this.stepActive = 3;
						this.headCont = '维权结束';
						this.mAjax();
					} else {
						this.stepActive = 0;
						this.headCont = '申请维权';
					}
				})
		},
		mAjax () {
			this.$api.post('OrderRightInfo', this.$route.query.orderCode)
				.then(res => {
					this.causeInfo = res.obj;
				})
		},
		causeChange (e) {
			this.causeIndex = e;
		},
		putDispute () {
			this.$notify.closeAll();
			let moReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;
			if (!this.payMoney) {
				this.$notify({
					title: '温馨提示',
					message: '请输入维权金额'
				});
			} else if (!moReg.test(this.payMoney)) {
				this.$notify({
					title: '温馨提示',
					message: '请正确输入维权金额'
				});
			} else if (!this.causeValue) {
				this.$notify({
					title: '温馨提示',
					message: '请选择维权原因'
				});
			} else {
				this.$api.post('CerateOrderRight', {
					orderCode: this.orderInfo.orderCode,
					applyPrice: this.payMoney,
					reason: this.causeIndex,
					contect: this.contact,
					summary: this.causeTextarea,
					imageUrl: this.uploadImg
				}).then(res => {
					this.$notify({
						title: '温馨提示',
						message: '维权申请成功'
					});
					this.cAjax();
				}) 
			}
		},
		beforeUpload (file) {
			if (file.size > 1024*1024) {
				this.$notify({
					title: '温馨提示',
					message: '单张图片最大仅限1M'
				});
				return false;
			}
		},
		uploadExceed () {
			this.$notify({
				title: '温馨提示',
				message: '最大只能上传10张图片'
			});
		},
		uploadSuccess (res, file, fileList) {
			this.uploadImg.push(file.url);
		},
		uploadRemove (file, fileList) {
			let _index = this.uploadImg.indexOf(file.url);
			if (_index > -1) this.uploadImg.splice(_index, 1);
		},
		uploadPictureCardPreview (file) {
			this.dialogImageUrl = file.url;
			this.dialogVisible = true;
		}
	}
}
</script>

<style lang="scss" scoped>
	.dispute-order-info {
		display: flex;
		flex-wrap: wrap;
		padding: 15px;
		li {
			display: flex;
			width: 50%;
			padding: 5px 0;
			span {
				padding-right: 3px;
			}
		}
	}
	.dispute-step {
		margin-top: 10px;
		.el-steps {
			margin: 20px 0;
		}
	}
	.dispute-step-cont {
		padding: 15px;
		border-top: 1px solid #e8eaec;
		.account-puc-list {
			width: 100%;
		}
		.el-select {
			width: 100%;
		}
		.wh-200 {
			width: 200px;
		}
	}
	.step-2 {
		h3 {
			font-weight: bold;
		}
		.cont {
			padding: 15px 10px;
			margin-top: 15px;
			border: 1px solid #e8eaec;
			li {
				padding: 3px 0;
			}
		}
		.mn {
			margin: 15px 0;
			text-align: right;
			span {
				color: #409EFF;
				font-size: 24px;
			}
		}
		.bd {
			border: 1px solid #e8eaec;
		}
	}
</style>
