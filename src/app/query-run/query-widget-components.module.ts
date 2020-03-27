import	{ QWCService }		from './query-widget-components.service'


export class QWCModule{

	static atPriority(priority:number){
		const annotations 		= (this as any).__annotations__
		const entryComponents	= []

		annotations.forEach( annotation => entryComponents.push(...annotation.entryComponents))
		
		QWCService.setPriority(priority, entryComponents)

		return this
	}

}
