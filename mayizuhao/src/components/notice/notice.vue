<template>
	<div class="notice">
		<notice-list :naId="1"></notice-list>
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
