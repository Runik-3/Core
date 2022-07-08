import { setActivePinia, createPinia } from 'pinia';
import { useStore } from '../../src/renderer/src/store/useStore';

const dictObj = {
	test: {
		Abessiniër: 'Abyssinian',
		Achilles: 'Achilles',
		Achilleshiel: "Achilles' heel",
		Adam: 'Adam',
		Aden: 'Aden',
		Adonis: 'Adonis',
		'Adriatiese See': 'Adriatic SeaAdriatic, Adriatic SeaAdriatic',
		Afganistan: 'Afghanistan',
		Afghaan: 'Afghan',
		Afghanistan: 'Afghanistan',
		'Afghanistan, Afganistan': 'Afghanistan',
		Afrika: 'Africa',
		Afrikaan: 'African',
		Afrikaans:
			'African, Afrikaans, Afrikaans languageAfrikaans languageAfrikaans',
		'Afrikaans, Afrikaan': 'African',
		Afrikaner: 'Afrikaner, Afrikander',
		'Afro-Asiaties': 'Afro-Asian',
		'Agter-Indië': 'Indo-China',
	},
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
			{ Abessiniër: 'Abessiniër' },
			{ Abessinië: 'Taco' },
		);
		expect(store.getSelectedDictionary.test['Abessinië']).toBe('Taco');
		expect(store.getSelectedDictionary.test['Abessiniër']).toBeUndefined();
	});
});
