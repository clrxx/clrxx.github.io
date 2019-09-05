<template>
	<div class="lump">
		<header-main />
			<div class="content-main">
				<logo-main v-if="this.$route.meta.isShowLogo == 1" />
				<router-view />
			</div>
		<footer-main />
		<el-backtop></el-backtop>
	</div>
</template>

<script>
import HeaderMain from '@/components/layout/header-main'
import LogoMain from '@/components/layout/logo-main'
import FooterMain from '@/components/layout/footer-main'
export default {
	components: {
		HeaderMain,
		LogoMain,
		FooterMain
	},
	watch: {
		$route () {
			document.documentElement.scrollTop = document.body.scrollTop = 0;
		}
	}
}
</script>
