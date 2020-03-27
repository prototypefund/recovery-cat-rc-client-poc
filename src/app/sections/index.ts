import	{	NgModule }				from '@angular/core'
import	{	QueriesSection }		from './queries-section.component'
import	{	QueryRunModule }		from '../query-run/query-run.module'


@NgModule({
	imports:[
		QueryRunModule
	],
	declarations:[
		QueriesSection
	],
	exports:[
		QueriesSection
	]
})
export class SectionsModule{}



export * from './queries-section.component'