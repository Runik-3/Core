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
			@addToUnsavedChanges="addToUnsavedChanges"
			:isEditable="true"
			v-for="[word, definition] in dictionaryDefinitions"
			:key="word"
			:title="word"
			:secondary="definition"
		/>
	</List>
	<button @click="saveChangesToDictionary">Save</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ListItem from '../components/ListItem.vue';
import List from '../components/List.vue';
import Search from './Search.vue';
import type { UpdatedRecord } from '@/typings/dictionaries/dictionary';

export default defineComponent({
	props: ['dictionaryData'],

	data(): {
		dictionaryDefinitions: Map<string, string>;
		searchQuery: string;
		isLoading: boolean;
		unsavedChanges: { [key: string]: UpdatedRecord };
	} {
		return {
			dictionaryDefinitions: new Map(this.dictionaryData.definitions),
			searchQuery: '',
			isLoading: false,
			unsavedChanges: {},
		};
	},

	methods: {
		saveChangesToDict() {},

		addToUnsavedChanges(definitionUpdate: UpdatedRecord) {
			this.unsavedChanges[definitionUpdate.oldRecord.word] =
				definitionUpdate;
			console.log(this.unsavedChanges);
		},

		closeDict() {
			if (this.unsavedChanges === {}) {
				this.$emit('closeDict');
				return;
			}
			console.log('unsavedChanges');
			// error popup 'you have unsaved changes do you want to cancel or continue?'
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
