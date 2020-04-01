import	{	FormControl	}			from '@angular/forms'

import	{	Question }				from '../questionaire'

export class Query {
	private submitCallback

	public date
	public answerFormControl:	FormControl
	public question:			Question

	constructor(		
		question:			Question,
		submitCallback:		(Query) => Promise<any>		
	){
		this.question 		= question
		this.submitCallback = submitCallback

		this.answerFormControl = new FormControl('', [], [this.question.asyncValidatorFn] )						
	}


	
	setDate(date: Date): void { 
		this.date = date
	}

	submit():Promise<any>{
		return Promise.resolve(this.submitCallback(this))
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

}