import { setActivePinia, createPinia } from 'pinia';
import { useStore } from '../../src/renderer/src/store/useStore';

const definitions = new Map<string, string>()
	.set('Abessiniër', 'Abyssinian')
	.set('Achilles', 'Achilles')
	.set('Achilleshiel', "Achilles' heel");

const dictObj = {
	meta: {
		name: 'test',
	},
	definitions,
};

describe('Testing dictionary store.', () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});

	test('Storing and fetching a dictionary.', () => {
		const store = useStore();
		store.setSelectedDictionary(dictObj);
		const dict = store.getSelectedDictionary;

		expect(dict).toEqual(dictObj);
	});

	test('Update a single record.', () => {
		const store = useStore();
		store.setSelectedDictionary(dictObj);
		store.updateDefinition(
			'test',
			{ word: 'Abessiniër', definition: 'Abessiniër' },
			{ word: 'Abessinië', definition: 'Taco' },
		);
		expect(store.getSelectedDictionary.definitions.get('Abessinië')).toBe(
			'Taco',
		);
		expect(
			store.getSelectedDictionary.definitions.get('Abessiniër'),
		).toBeFalsy();
	});
});
