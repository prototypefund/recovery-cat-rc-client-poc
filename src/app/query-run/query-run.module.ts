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
		}								from './best-widget-match.pipe'


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
	],
	exports: [
		QueryRunComponent,
	],
})
export class QueryRunModule {}

