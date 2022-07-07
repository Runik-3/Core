<template>
	<li class="border border-gray-300 rounded cursor-pointer">
		{{ title }}
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['title'],
});
</script>
