import 	{ 
			NgModule, 
			InjectionToken,
			ModuleWithProviders
		}                     			from '@angular/core'
import 	{ 	CommonModule }				from '@angular/common'

import 	{ 	IonicModule }				from '@ionic/angular'

import 	{ 	QueryRunComponent }			from './query-run.component'
import	{	
			BestWidgetMatchPipe,
			InjectQueryPipe, 
		}								from './query-run.pipes'
import	{
			QueryComponent			
		}								from './query.component'
import	{	Questionaire }				from '../questionaire'




@NgModule({
	imports: [
		CommonModule,
		IonicModule,

	],
	declarations: [
		QueryRunComponent,    
		BestWidgetMatchPipe,
		InjectQueryPipe,
		QueryComponent
	],
	exports: [
		InjectQueryPipe,
		BestWidgetMatchPipe,
		QueryRunComponent,
		QueryComponent
	],
})
export class QueryRunModule {}

