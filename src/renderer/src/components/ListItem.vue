<template>
	<li class="p-2 last:border-none border-b border-b-gray-300 cursor-pointer">
		<h3 class="font-bold">{{ title }}</h3>
		<span>{{ secondary }}</span>
	</li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['title', 'secondary'],
});
</script>
