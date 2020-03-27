export interface TranslationMap {
	[index:string]:	string
}

export interface StringOptionConfig{
	value:			string,
	meaning:		string,	
	translations:	TranslationMap
}

export interface NumberOptionConfig{
	value:			number,
	meaning?:		string,
	translations?:	TranslationMap
}


export interface QuestionConfig {
	id:				string,
	meaning:		string,
	translations:	TranslationMap,
	type:			string,
	min?:			number, 
	max?:			number,
	options?:		(StringOptionConfig|NumberOptionConfig)[],
	tags?:			string[],
	unit?:			string,
	note?:			string
}

