<template>
	<div class="promotion">
		<div class="account-puc">
			<div class="promotion-main">
				<div class="promotion-utl">
					<h4>推广地址：</h4>
					<el-select v-model="moSel" size="small" placeholder="请选择">
						<el-option
							v-for="item in moOptions"
							:key="item.value"
							:label="item.label"
							:value="item.value">
						</el-option>
					</el-select>
					<el-input v-model="moLink" size="small"></el-input>
					<el-button type="primary" size="small">生成链接</el-button>
					<el-button type="primary" size="small">创建</el-button>
					<el-button type="danger" size="small">重置</el-button>
				</div>
				<div class="promotion-dot">
					<h4>邀请码：</h4>
					<h4>邀请次数：次</h4>
					<h4>我的收益：元</h4>
					<h4>收益系数：<span>%</span></h4>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
		return {
			moSel: '主页',
			moOptions: [{
				value: '主页',
          		label: '主页'
			}],
			moLink: ''
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
