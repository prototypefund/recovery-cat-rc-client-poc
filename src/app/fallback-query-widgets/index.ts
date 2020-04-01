import 	{	
			NgModule,
			Inject,
			ComponentFactoryResolver
		}											from '@angular/core'
import 	{ 	CommonModule }							from '@angular/common'

import 	{	ReactiveFormsModule } 					from '@angular/forms';

import 	{ 	IonicModule }							from '@ionic/angular'
import	{	FallbackQueryWidgetComponent }			from './fallback-query-widget.component'
import	{	FallbackQueryWidgetUnknownComponent }	from './fallback-query-widget-unknown.component'

import	{	QWCModule }								from '../query-run/query-widget-components.module'


@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		ReactiveFormsModule,
	],
	declarations:[
		FallbackQueryWidgetComponent,
		FallbackQueryWidgetUnknownComponent
	],
	entryComponents:[
		FallbackQueryWidgetComponent,
		FallbackQueryWidgetUnknownComponent,	
	],
})
export class FallbackQueryWidgetsModule extends QWCModule{}

