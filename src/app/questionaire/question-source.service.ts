import	{	Injectable }			from '@angular/core'
import 	{	Observable }			from 'rxjs'
import	{	QuestionConfig }		from './question-config.interface'
import	{	Questionaire }			from './questionaire.service'

export interface QuestionSourceClass {
	new():QuestionSource
}	

export interface QuestionSource {
	get(ids:string[]):Observable<QuestionConfig>
}

