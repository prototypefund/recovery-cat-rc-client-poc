//TODO Plugin for Question Types!



import	{
			AsyncValidatorFn,
			AbstractControl,
			ValidationErrors,
			FormControl
		}							from '@angular/forms'


import 	{ 	
			Observable,
			from,
		} 							from 'rxjs'



import	{	QuestionConfig }		from './question-config.interface'

import	{	
			QuestionValidator,
			QuestionValidationError 
		}							from './question-validator'


export class Question implements QuestionConfig{
	
	private _config: 	QuestionConfig
	private _error:		any 				= null

	public id
	public type
	public meaning
	public translations

	public storedAnswers: 		any[]
	public answerFormControl: 	FormControl 


	private unknownConfig(id:string): QuestionConfig{
		return	{
					id: 			id,
					translations: 	{en: 'Unknown question: #'+id}, //todo use translationservice
					type:			'unknown',
					meaning:		'Missing config for question: #'+id
				}
	}

	constructor(id:string)  
	constructor(config:QuestionConfig) 
	constructor(idOrConfig: string | QuestionConfig){ 

		this._config	=	typeof idOrConfig == 'string'
							?	this.unknownConfig(idOrConfig)
							:	idOrConfig

		this.answerFormControl = new FormControl('', [], [this.asyncValidatorFn] )						

		for(let key in this._config) Object.defineProperties(this, {[key]: {get: ()=> this._config[key]}})

	}


	public async validateAnswer(value:any):Promise<object | null>{
		return QuestionValidator.validateAnswer(value, this._config)
	}

	get asyncValidatorFn():AsyncValidatorFn {		

		return async function(control:AbstractControl): Promise<ValidationErrors | null> {			
			return	this.validateAnswer(control.value)
					.catch( error => error instanceof QuestionValidationError ? error : Promise.reject(error) )
		}.bind(this)

	}

	set answer(value){		
		this.answerFormControl.setValue(value)
	}

	get answer(){
		return this.answerFormControl.value
	}

	get complete(){
		return this.answerFormControl.valid
	}


	public store(): Observable<any>{
		if(!this.complete) throw "QUESTION_NOT_COMPLETE"
		console.log('mock: store', this.asnwer)
		return from([])	
	}

}
