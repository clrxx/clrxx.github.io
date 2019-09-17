<template>
	<div id="cbox"></div>
</template>

<script>
export default {
	mounted () {
		this.YPriddler();
	},
	methods: {
		YPriddler () {
			let that = this;
			new YpRiddler({
				mode: 'dialog',
				lang: 'zh-cn',
				winWidth: 500,
				expired: 60,
				container: document.getElementById('cbox'),
				appId: '23812844aba9402bafc143a6037d57a5',
				version: 'v1',
				onError: function (param) {
					if (param.code == 429) {
						that.$notify({
							message: '请求过于频繁，请稍后再试！',
							type: 'warning'
						});
						return;
					};
					// 异常回调
					that.$notify({
						message: '验证服务异常',
						type: 'warning'
					});
				},
				onSuccess: function (validInfo, close, useDefaultSuccess) {
					// 成功回调
					// alert(`验证通过!token=${validInfo.token}, authenticate=${validInfo.authenticate}`);
					useDefaultSuccess(true);
					that.$emit('YPChange', validInfo);
					close();
				},
				onFail: function (code, msg, retry) {
					// 失败回调
					// alert('出错啦：' + msg + ' code: ' + code);
					retry();
				},
				beforeStart: function (next) {
					// console.log('验证马上开始');
					next();
				},
				onExit: function () {
					// 退出验证 （仅限dialog模式有效）
					// console.log('退出验证');
				}
			})
		}
	}
}
</script>

<style>
	.yp-riddler.yp-riddler-button {
		width: 300px;
	}
	.yp-riddler .yp-riddler-winbox {
		margin: 30px auto 0;
	}
</style>

