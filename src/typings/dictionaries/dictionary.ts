export interface Definition {
	word: string;
	definition: string;
}

export interface MetaData {
	name: string;
}

// future iterations of this shape should include xdxf metadata
/* 
{
  dictName: {
    meta: {
      title: string,
      authror: string,
      ...etc
    }
    defs: {
      word: definition
    }
  }
}
*/
export interface DictionaryObject {
	meta: MetaData;
	definitions: Map<string, string>;
}
