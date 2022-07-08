<template>
	<button @click="closeDict" class="close w-full text-right">X</button>
	<List>
		<ListItem
			:isEditable="true"
			v-for="[word, definition] in dictionaryData.definitions"
			:key="word"
			:title="word"
			:secondary="definition"
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
