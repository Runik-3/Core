type Definition = { [key: string]: string };

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
export type DictionaryObject = { [key: string]: Definition };
