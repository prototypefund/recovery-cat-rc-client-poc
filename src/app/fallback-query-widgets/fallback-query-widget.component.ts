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

import	{	QueryWidgetQuestionToken }		from '../query-run/query-widget-components.service'
import	{	RegisterQWC }					from '../query-run/query-widget-component.decorator'
import	{	Question }						from '../questionaire/question.class'


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

	public question: 	Question
	public unsubscribe

	constructor(@Inject(QueryWidgetQuestionToken) question: Question){
		this.question 		= question
		this.unsubscribe 	= question.answerFormControl.valueChanges.subscribe({
			next : value => {
				if(question.type == 'string' 	&& typeof value != 'string') 	this.question.answerFormControl.setValue(String(value))
				if(question.type == 'float'		&& typeof value != 'number') 	this.question.answerFormControl.setValue(Number(value)||0)
				if(question.type == 'integer'	&& typeof value != 'number') 	this.question.answerFormControl.setValue(Number(value)||0)				
			}
		})
	}

	ngOnInit() {
	}

	ngOnDestroy(){
		this.unsubscribe()
	}
}

