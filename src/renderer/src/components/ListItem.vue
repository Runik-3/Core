<template>
	<li
		class="flex p-2 last:border-none border-b border-b-gray-300 cursor-pointer"
	>
		<div v-if="!isEditMode" class="flex flex-col w-full">
			<h3 class="font-bold">
				{{ def.word }}
			</h3>
			<span>{{ def.definition }}</span>
		</div>

		<div v-else-if="isEditable && isEditMode" class="flex flex-col w-full">
			<input
				type="text"
				v-model="def.word"
				class="font-bold border border-gray-400"
			/>
			<input
				type="text"
				v-model="def.definition"
				class="border border-gray-400"
			/>
		</div>
		<button
			v-show="isEditMode"
			@click="saveChangesToDefinition"
			class="mr-2 bg-green-500"
		>
			save
		</button>
		<button @click="makeEditable" v-show="isEditable">
			{{ !isEditMode ? 'edit' : 'cancel' }}
		</button>
	</li>
</template>

<script lang="ts">
import type { Definition } from '@/typings/dictionaries/dictionary';
import { defineComponent } from 'vue';
import useStore from '../store/useStore';
import isEqual from 'lodash/isEqual';

export default defineComponent({
	props: ['title', 'secondary', 'isEditable'],
	data(): {
		def: {
			word: string;
			definition: string;
		};
		store: any;
		isEditMode: boolean;
	} {
		return {
			def: {
				word: this.title,
				definition: this.secondary,
			},
			store: useStore(),
			isEditMode: false,
		};
	},

	methods: {
		makeEditable() {
			this.isEditMode = !this.isEditMode;
		},

		saveChangesToDefinition() {
			const oldRecord: Definition = {
				word: this.title,
				definition: this.secondary,
			};
			const newRecord: Definition = {
				word: this.def.word,
				definition: this.def.definition,
			};

			if (!isEqual(oldRecord, newRecord)) {
				this.$emit('addToUnsavedChanges', { oldRecord, newRecord });
			}
		},
	},
	emits: ['addToUnsavedChanges'],
});
</script>
