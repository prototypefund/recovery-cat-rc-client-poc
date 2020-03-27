import	{	Injectable }	from '@angular/core'
import	{	Questionaire }	from './questionaire.service'

export function QuestionSourceInjectable(args: any = {}): (cls: any) => any {

	const ngInjectableDecorator = Injectable({providedIn: 'root', deps:[Questionaire]})
	
	return function (target: any) {
		ngInjectableDecorator(target)
		Questionaire.sourceClasses.push(target)
	}
}
