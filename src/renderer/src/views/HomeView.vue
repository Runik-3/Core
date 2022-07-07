<template>
	<main>
		<h1 class="font-header text-3xl font-semibold">Library</h1>
		<!-- separate into list and list item components -->
		<div v-if="!selectedDictionary">
			<List v-if="library.length !== 0">
				<ListItem
					@click="getDict(dict)"
					v-for="dict in library"
					:key="dict"
					:title="dict"
				/>
			</List>
			<p v-else>nothing here</p>
		</div>
		<div v-else>
			<DictionaryEdit
				@closeDict="closeDictionaryEditor"
				:dictionaryData="selectedDictionary"
			/>
		</div>
	</main>
</template>

<script lang="ts">
import type { DictionaryObject } from '@/typings/dictionary';
import { defineComponent } from 'vue';
import ListItem from '../components/ListItem.vue';
import DictionaryEdit from '../components/DictionaryEdit.vue';
import List from '../components/List.vue';

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

		closeDictionaryEditor() {
			this.selectedDictionary = undefined;
		},
	},

	components: { ListItem, DictionaryEdit, List },
});
</script>
