<template>
	<div class="notice">
		<notice-list :neid="1"></notice-list>
	</div>
</template>

<script>
import NoticeList from './list'
export default {
	components: {
		NoticeList
	}
}
</script>
