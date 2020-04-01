import 	{ 
			Pipe, 
			PipeTransform,
			ComponentRef,
			Injector,
			ReflectiveInjector
		}								from '@angular/core'

import	{	
			QWCService,
			QueryToken,
		}								from './query-widget-components.service'

import	{	Query }						from '../reports'


@Pipe({
	name: 'bestWidgetMatch'
})
export class BestWidgetMatchPipe implements PipeTransform {

	constructor(private QWCService: QWCService){}

	transform(query: Query): ComponentRef<any> {		
		return 	this.QWCService.getQWCByPriority(query.question)[0]
	}
}

@Pipe({
	name: 'injectQuery'
})

export class InjectQueryPipe implements PipeTransform {

	constructor(private injector: Injector){}

	transform(query:Query): Injector { 
		return 	Injector.create({
					providers: 	[
									{
										provide: 	QueryToken, 
										useValue: 	query
									}
								], 
					parent:		this.injector
				}) 
	}

}
