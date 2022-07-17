import { defineStore } from 'pinia';
import type {
	Definition,
	DictionaryObject,
} from '../../../typings/dictionaries/dictionary';

const useStore = defineStore({
	id: 'Library',
	state: () => ({
		selectedDictionary: {} as DictionaryObject,
	}),
	getters: {
		getSelectedDictionary: state => state.selectedDictionary,
	},
	actions: {
		setSelectedDictionary(selectedDict: DictionaryObject) {
			this.selectedDictionary = selectedDict;
		},

		isDefined() {
			if (this.selectedDictionary?.meta?.name) {
				return true;
			}
			return false;
		},

		updateDefinition(oldRecord: Definition, newRecord: Definition) {
			this.selectedDictionary.definitions.delete(oldRecord.word);
			this.selectedDictionary.definitions.set(
				newRecord.word,
				newRecord.definition,
			);
		},

		alphabetizeDefinitions() {
			const alphaDefs = new Map(
				[...this.selectedDictionary.definitions].sort(([a], [b]) => {
					// TODO: when languages are supported, add locales and sensitivity
					return a.localeCompare(b);
				}),
			);
			console.log(alphaDefs);
			this.selectedDictionary.definitions = alphaDefs;
		},
	},
});

export default useStore;
