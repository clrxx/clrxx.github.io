<template>
	<div class="promotion">
		<div class="account-puc">
			<div class="promotion-main">
				<div class="promotion-utl">
					<h4>推广地址：</h4>
					<el-select v-model="moSel" size="small" placeholder="请选择">
						<el-option v-for="item in moOptions" :key="item" :label="item" :value="item"></el-option>
					</el-select>
					<el-input v-model="moLink" size="small"></el-input>
					<el-button v-if="isMo" @click="creatSpread" type="primary" size="small">创建</el-button>
					<el-button @click="buildUrl" type="primary" size="small">生成链接</el-button>
				</div>
				<div class="promotion-dot">
					<h4>邀请码：{{ proInfo.spreadCode }}</h4>
					<h4>邀请次数：{{ proInfo.invitationCount }}次</h4>
					<h4>我的收益：{{ proInfo.profitPrice }}元</h4>
					<h4>收益系数：{{ proInfo.profitPCT }}%</h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			isMo: true,
			moLink: '',
			moSel: '主页',
			moOptions: ['主页'],
			proInfo: {
				spreadCode: '当前无邀请码，可点击创建',
				invitationCount: 0,
				profitPrice: 0,
				profitPCT: 0,
			},
		}
	},
	created () {
		this.cAjax();
	},
	methods: {
		cAjax () {
			this.$api.post('GetSpreadInfo')
				.then(res => {
					this.proInfo = res.obj;
					this.isMo = false;
				})
		},
		creatSpread () {
			this.$api.post('CreateSpread')
				.then(res => {
					this.$notify({
						title: '温馨提示',
						message: '邀请码创建成功'
					});
					this.cAjax();
				})
		},
		buildUrl () {
			let _href = window.location.href;
			this.moLink = encodeURI(_href.slice(0, _href.indexOf('/account')) +'?SCode='+ this.proInfo.spreadCode);
		}
	}
}
</script>

<style lang="scss" scoped>
	.promotion-utl {
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		.el-select {
			width: 100px;
		}
		.el-input {
			width: 500px;
			margin-right: 10px;
		}
	}
	.promotion-dot {
		padding-top: 10px;
		border-top: 1px solid #e8eaec;
		h4 {
			padding: 10px 0;
		}
	}
</style>
