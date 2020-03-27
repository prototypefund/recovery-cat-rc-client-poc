import	{	
			Injectable, 
			ComponentFactoryResolver,
			ComponentFactory,
			ComponentRef,
			InjectionToken,
			NgModule,
		} 							from '@angular/core'

import	{	Question }				from '../questionaire/question.class'


export const QueryWidgetQuestionToken = new InjectionToken<string>('question'); 

interface QWCConfig {
	component:			ComponentRef<any>,
	getWidgetMatch:		(question:Question) => number,
	priority?:			number
}



@Injectable({
	providedIn: 'root'
})
export class QWCService{


	//Static:
	
	static 	QWCConfigs:QWCConfig[] 	= []
	
	static	registerQWCConfig({component, getWidgetMatch, priority = 0}:QWCConfig){				
				this.QWCConfigs.push({component, getWidgetMatch, priority})
			}

	static	setPriority(priority: number, components: ComponentRef<any>[]){
				this.QWCConfigs
				.forEach( config => {
					if(components.includes(config.component)) config.priority = Math.max(priority, config.priority||0)
				})
			}




	//Instance:

	constructor(){}

	public getQWCByPriority(question: Question): ComponentRef<any>[] {
		return	QWCService.QWCConfigs
				.map( (config: QWCConfig) => ({					
					component:	config.component,
					match:		config.getWidgetMatch(question),
					priority:	config.priority || 0
				}))
				.sort( (item1, item2) => {
					return Math.sign(item1.priority - item2.priority) || Math.sign(item1.match - item2.match)
				})
				.map( item => item.component)
	}
}