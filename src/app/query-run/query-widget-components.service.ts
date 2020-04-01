import	{	
			Injectable, 
			ComponentFactoryResolver,
			ComponentFactory,
			ComponentRef,
			InjectionToken,
			NgModule,
		} 							from '@angular/core'

import	{	Question }				from '../questionaire/question.class'


export const QueryToken = new InjectionToken<string>('query'); 

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
				.map( 		config 			=> ({					
													component:	config.component,
													match:		config.getWidgetMatch(question),
													priority:	config.priority || 0
												})
				)
				.filter(	item 			=> item.match >= 0 )
				.sort( 		(item1, item2) 	=> Math.sign(item2.match - item1.match) || Math.sign(item2.priority - item1.priority) )
				.map( 		item 			=> item.component)
	}
}