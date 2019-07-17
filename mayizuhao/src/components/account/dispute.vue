<template>
	<div class="dispute">
		<div class="dispute-order white-radius">
			<div class="account-title-small">
				<h3>申请维权</h3>
			</div>
			<ul class="dispute-order-info">
				<li><span>订单编号：</span>2019062514044160029351921200033</li>
				<li><span>订单状态：</span>取消/维权（提交后变成维权）</li>
				<li><span>下单时间：</span>2019年06月25号 14:04:41</li>
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
				<!-- <div class="step-1">
					<ul class="account-puc-list">
						<li>
							<label>充值金额：</label>
							<el-input v-model="payMoney" size="small" placeholder="请输入金额" class="wh-200"></el-input>
						</li>
						<li>
							<label>维权原因：</label><el-select v-model="causeValue" size="small" placeholder="请选择原因">
								<el-option
									v-for="item in causeOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
								</el-option>
							</el-select>
						</li>
						<li>
							<label>联系方式：</label><el-input v-model="contact" size="small" placeholder="请输入联系方式"></el-input>
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
							<label>附件：</label>
							<el-upload
								class="upload-demo"
								action="https://jsonplaceholder.typicode.com/posts/"
								multiple
								:on-success="fileSuccess"
								:on-error="fileError">
								<el-button size="small" icon="el-icon-upload2">点击上传</el-button>
							</el-upload>
						</li>
						<li><label></label>
							<el-button type="primary" size="small">提交申请</el-button>
						</li>
					</ul>
				</div> -->
				<div class="step-2-3">
					<h3>维权记录</h3>
					<ul class="cont">
						<li>客服回复：（3的时候显示客服列表）</li>
						<li>处理结果：成功</li>
						<li>处理描述：卖家处理维权</li>
					</ul>
					<ul class="cont">
						<li>于创建维权申请</li>
						<li>维权原因：</li>
						<li>申请退款金额：</li>
						<li>申请说明：</li>
					</ul>
					<div class="mn">维权金额：<span>￥0</span></div>
					<ul class="dispute-order-info bd">
						<li><span>创建时间：</span>2019年06月25号 14:04:41</li>
						<li><span>订单状态：</span>提交/成功（3的时候显示成功）</li>
						<li><span>退款金额：</span>状态显示成功才显示</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			stepActive: 1,
			payMoney: '',
			causeValue: '',
			causeTextarea: '',
			contact: '',
			causeOptions: [{
				value: '其他问题',
				label: '其他问题'
			}, {
				value: '账号信息与描述不符',
				label: '账号信息与描述不符'
			}, {
				value: '账号被封',
				label: '账号被封'
			}, {
				value: '密码错误导致无法登陆',
				label: '密码错误导致无法登陆'
			}, {
				value: '账号在线或顶号导致无法正常游戏',
				label: '账号在线或顶号导致无法正常游戏'
			}, {
				value: '异地或锁定导致无法登陆',
				label: '异地或锁定导致无法登陆'
			}, {
				value: '虚贝百宝箱异常',
				label: '虚贝百宝箱异常'
			}, {
				value: '开外挂',
				label: '开外挂'
			}]
		}
	},
	methods: {
		fileSuccess (res, file) {
			console.log(file);
		},
		fileError (err, file) {
			console.log(file);
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
	.step-2-3 {
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
