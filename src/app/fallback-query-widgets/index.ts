import 	{	
			NgModule,
			Inject,
			ComponentFactoryResolver
		}									from '@angular/core'
import 	{ 	CommonModule }					from '@angular/common'

import 	{	ReactiveFormsModule } 			from '@angular/forms';

import 	{ 	IonicModule }					from '@ionic/angular'
import	{	FallbackQueryWidgetComponent }	from './fallback-query-widget.component'

import	{	QWCModule }						from '../query-run/query-widget-components.module'


@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		ReactiveFormsModule,
	],
	declarations:[
		FallbackQueryWidgetComponent
	],
	entryComponents:[
		FallbackQueryWidgetComponent,	
	],
})
export class FallbackQueryWidgetsModule extends QWCModule{}

