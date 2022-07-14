<template>
	<input
		type="text"
		:value="modelValue"
		:placeholder="placeholder"
		class="border border-gray-400"
		@input="inputHandler"
		:isLoading="isLoading"
	/>
	{{ isLoading }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['placeholder', 'isLoading', 'modelValue'],

	data(): {
		searchQuery: string;
	} {
		return {
			searchQuery: '',
		};
	},

	methods: {
		inputHandler(e: Event) {
			this.$emit('updateQuery', (e.target as HTMLInputElement).value);
		},
	},

	emits: ['updateQuery'],
});
</script>
