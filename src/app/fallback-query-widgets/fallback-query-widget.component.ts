//TODO, everything into its own component

import 	{ 	
			OnDestroy,
			Inject,
			Component,
		}									from '@angular/core'
import	{	
			QueryToken, 
			RegisterQWC 
		}									from '../query-run'
import	{	Query }							from '../reports'


@RegisterQWC({
	getWidgetMatch: question => 0
})
@Component({
	selector:     'fallback-query-widget',
	templateUrl:   './fallback-query-widget.component.html',
	styleUrls:     ['./fallback-query-widget.component.scss']
})
export class FallbackQueryWidgetComponent implements OnDestroy {

	public query: 	Query
	public subscription

	constructor(@Inject(QueryToken) query: Query){
		this.query 			= query
		this.subscription 	= query.answerFormControl.valueChanges.subscribe({
			next : value => {
				if(query.question.type == 'string' 	&& typeof value != 'string') 	this.query.answerFormControl.setValue(String(value))
				if(query.question.type == 'float'	&& typeof value != 'number') 	this.query.answerFormControl.setValue(Number(value)||0)
				if(query.question.type == 'integer'	&& typeof value != 'number') 	this.query.answerFormControl.setValue(Number(value)||0)				
			}
		})
	}
	ngOnDestroy(){
		this.subscription.unsubscribe()
	}
}

