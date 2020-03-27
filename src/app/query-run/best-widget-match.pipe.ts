import 	{ 
			Pipe, 
			PipeTransform,
			ComponentRef,
			Injector,
			ReflectiveInjector
		}								from '@angular/core'

import	{	
			QWCService,
			QueryWidgetQuestionToken,
		}								from './query-widget-components.service'

import	{	Question }					from '../questionaire'


@Pipe({
	name: 'bestWidgetMatch'
})
export class BestWidgetMatchPipe implements PipeTransform {

	constructor(private QWCService: QWCService){}

	transform(question: Question): ComponentRef<any> {		
		return 	this.QWCService.getQWCByPriority(question)[0]
	}
}

@Pipe({
	name: 'injectQuestion'
})

export class InjectQuestionPipe implements PipeTransform {

	constructor(private injector: Injector){}

	transform(question: Question): Injector { 
		return 	Injector.create({
					providers: 	[
									{
										provide: 	QueryWidgetQuestionToken, 
										useValue: 	question
									}
								], 
					parent:		this.injector
				}) 
	}

}
