<template>
	<ul>
		<li v-for="(def, word) in dictionaryData" :key="word">
			<span class="font-bold">{{ word }}</span
			>{{ ' -- ' }}
			<span>{{ def }}</span>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: ['dictionaryData'],
});
</script>
