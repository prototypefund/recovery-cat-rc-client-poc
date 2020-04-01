import 	{ 
			Pipe, 
			PipeTransform,
			ComponentRef,
			Injector,
			ReflectiveInjector
		}								from '@angular/core'

import	{	
			Question
		}								from './question.class'

import	{	
			Questionaire 
		}								from './questionaire.service'


@Pipe({
	name: 'question'
})
export class QuestionPipe implements PipeTransform {

	constructor(private Questionaire: Questionaire){}

	transform(id: string): Promise<Question> {		
		return this.Questionaire.getQuestion(id)
	}
}
