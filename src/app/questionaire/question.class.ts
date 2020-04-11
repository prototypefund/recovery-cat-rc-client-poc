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
			of,
			defer,
			throwError,
			interval
		} 							from 'rxjs'

import 	{
			take,
			switchMap
		}							from 'rxjs/operators'


import	{	QuestionConfig }		from './question-config.interface'

import	{	
			QuestionValidator,
			QuestionValidationError 
		}							from './question-validator'


export class Question implements QuestionConfig{
	
	private _config: 	QuestionConfig

	public id
	public type
	public meaning
	public translations

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

	get config()	{ return this._config }

	// public report$(): Observable<any>{

	// 	return	defer( () => {  
	// 				return	this.answerFormControl.pending
	// 						?	this.answerFormControl.statusChanges.pipe(take(1))
	// 						:	of(this.answerFormControl.status)
	// 			})
	// 			.pipe( switchMap( (status) => status == 'VALID' ? of('läuft') : throwError('ANSWER_INVALID') ))
	// 			//TODO Error handling!

	// }

}
