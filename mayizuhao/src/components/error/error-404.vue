<template>
  	<error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src"/>
</template>

<script>
import error404 from '@/assets/error-404.svg'
import errorContent from '@/components/error/error-content'
export default {
	name: 'error-404',
	components: {
		errorContent
	},
	data () {
		return {
			src: error404
		}
	}
}
</script>
