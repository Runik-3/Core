<template>
	<button @click="closeDict" class="close w-full text-right">X</button>
	<List>
		<ListItem
			v-for="(def, word) in dictionaryData"
			:key="word"
			:title="word"
			:secondary="def"
		/>
	</List>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListItem from '../components/ListItem.vue';
import List from '../components/List.vue';

export default defineComponent({
	props: ['dictionaryData'],

	methods: {
		closeDict() {
			this.$emit('closeDict');
		},
	},

	emits: ['closeDict'],
	components: { ListItem, List },
});
</script>
