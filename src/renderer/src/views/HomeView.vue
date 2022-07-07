<template>
	<main>
		<h1 class="font-header text-3xl font-semibold">Library</h1>
		<!-- separate into list and list item components -->
		<div v-if="!selectedDictionary">
			<ul class="space-y-2" v-if="library.length !== 0">
				<LibraryListItem
					@click="getDict(dict)"
					v-for="dict in library"
					:key="dict"
					:title="dict"
				/>
			</ul>
			<p v-else>nothing here</p>
		</div>
		<div v-else>
			<DictionaryEdit :dictionaryData="selectedDictionary" />
		</div>
	</main>
</template>

<script lang="ts">
import type { DictionaryObject } from '@/typings/types';
import { defineComponent } from 'vue';
import LibraryListItem from '../components/LibraryListItem.vue';
import DictionaryEdit from '../components/DictionaryEdit.vue';

export default defineComponent({
	data(): {
		library: string[];
		selectedDictionary?: DictionaryObject;
	} {
		return {
			library: [],
			selectedDictionary: undefined,
		};
	},

	async beforeMount() {
		const data: string[] = await window.ipcRenderer.invoke('getLibrary');
		this.library = [...data];
	},

	methods: {
		async getDict(dictName: string) {
			const dictData = await window.ipcRenderer.invoke(
				'forgeGetDict',
				dictName,
			);
			this.dictionaryEdit(dictData);
		},

		dictionaryEdit(dictData: DictionaryObject) {
			this.selectedDictionary = dictData;
		},
	},

	components: { LibraryListItem, DictionaryEdit },
});
</script>
