<template>
	<main>
		<h1 class="font-header text-3xl font-semibold">Library</h1>
		<!-- separate into list and list item components -->
		<ul v-if="library !== []">
			<li @click="getDict(dict)" v-for="dict in library" :key="dict">
				{{ dict }}
			</li>
		</ul>
		<p v-else>nothing here</p>
	</main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data(): {
		library: Array<string>;
	} {
		return {
			library: [],
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
			console.log(dictData);
		},
	},
});
</script>
