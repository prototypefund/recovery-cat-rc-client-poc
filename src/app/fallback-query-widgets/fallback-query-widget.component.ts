//TODO, everything into its own component

import 	{ 	
			OnInit,
			OnDestroy,
			Input,
			Inject,
			Component,

		}									from '@angular/core'

import 	{	
			FormControl,
			Validators 
		} 									from '@angular/forms';

import	{	QueryToken }					from '../query-run/query-widget-components.service'
import	{	RegisterQWC }					from '../query-run/query-widget-component.decorator'
import	{	Query }							from '../reports'


@RegisterQWC({
	getWidgetMatch: question => {
		return 0
	}
})
@Component({
	selector:     'fallback-query-widget',
	templateUrl:   './fallback-query-widget.component.html',
	styleUrls:     ['./fallback-query-widget.component.scss']
})
export class FallbackQueryWidgetComponent implements OnInit,OnDestroy {

	public query: 	Query
	public unsubscribe

	constructor(@Inject(QueryToken) query: Query){
		this.query 			= query
		this.unsubscribe 	= query.answerFormControl.valueChanges.subscribe({
			next : value => {
				if(query.question.type == 'string' 	&& typeof value != 'string') 	this.query.answerFormControl.setValue(String(value))
				if(query.question.type == 'float'	&& typeof value != 'number') 	this.query.answerFormControl.setValue(Number(value)||0)
				if(query.question.type == 'integer'	&& typeof value != 'number') 	this.query.answerFormControl.setValue(Number(value)||0)				
			}
		})
	}

	ngOnInit() {
	}

	ngOnDestroy(){
		this.unsubscribe()
	}
}

