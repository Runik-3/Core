<template>
	<button @click="closeDict" class="close w-full text-right">X</button>
	<!-- search component -->
	<Search
		placeholder="Search Definitions"
		:isLoading="isLoading"
		v-model="searchQuery"
		@updateQuery="filterDefs"
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
import Search from './Search.vue';

export default defineComponent({
	props: ['dictionaryData'],

	data(): {
		dictionaryDefinitions: Map<string, string>;
		searchQuery: string;
		isLoading: boolean;
	} {
		return {
			dictionaryDefinitions: new Map(this.dictionaryData.definitions),
			searchQuery: '',
			isLoading: false,
		};
	},

	methods: {
		closeDict() {
			this.$emit('closeDict');
		},

		isListLoading(listSize: number, renderedItems: number) {
			console.log(listSize, renderedItems);
			if (listSize !== renderedItems) {
				this.isLoading = true;
				setTimeout(() => {
					this.isListLoading(listSize, renderedItems);
				}, 50);
			}
			this.isLoading = false;
			return;
		},

		filterDefs(query: string) {
			this.searchQuery = query;
			this.dictionaryDefinitions = this.filterMap;
		},

		getLiItemsInDom() {
			return document.getElementsByTagName('li');
		},
	},

	computed: {
		filterMap(): Map<string, string> {
			const filteredDefinitions = new Map(
				[...this.dictionaryData.definitions].filter(([word, def]) => {
					if (
						word.toLowerCase().includes(this.searchQuery) ||
						def.toLowerCase().includes(this.searchQuery)
					) {
						return def;
					}
				}),
			);
			return filteredDefinitions as Map<string, string>;
		},
	},

	emits: ['closeDict'],
	components: { ListItem, List, Search },
});
</script>
