<template>
	<button @click="closeDict" class="close w-full text-right">X</button>
	<!-- search component -->
	<input
		type="text"
		v-model="searchDefs"
		class="border border-gray-400"
		@input="filterDefs"
	/>
	<List>
		<ListItem
			:isEditable="true"
			v-for="[word, definition] in dictionaryDefinitions"
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

	data(): {
		dictionaryDefinitions: Map<string, string>;
		searchDefs: string;
	} {
		return {
			dictionaryDefinitions: new Map(this.dictionaryData.definitions),
			searchDefs: '',
		};
	},

	methods: {
		closeDict() {
			this.$emit('closeDict');
		},

		filterDefs() {
			const query = this.searchDefs;
			if (query.length > 3) {
				this.dictionaryDefinitions.forEach((def, word) => {
					if (
						!def.toLowerCase().includes(query.toLowerCase()) ||
						!word.toLowerCase().includes(query.toLowerCase())
					) {
						this.dictionaryDefinitions.delete(word);
					}
				});
			}
		},
	},

	emits: ['closeDict'],
	components: { ListItem, List },
});
</script>
