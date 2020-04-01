import	{	NgModule }							from '@angular/core'
import	{	CommonModule }						from '@angular/common'
import	{	RouterModule }						from '@angular/router'
import	{	IonicModule }						from '@ionic/angular'
import	{	QuerySection }						from './query/query.component'
import	{	QueriesSection }					from './queries/queries.component'
import	{	ReportingSchedulesOverviewSection }	from './reporting-schedules-overview/reporting-schedules-overview.component'
import	{	ReportingScheduleSection }			from './reporting-schedule/reporting-schedule.component'
import	{	QueryRunModule }					from '../query-run/query-run.module'
import	{	QuestionaireModule }				from '../questionaire'			
import	{	SchedulingModule }					from '../schedules'

@NgModule({
	imports:[
		IonicModule,
		CommonModule,
		QueryRunModule,
		RouterModule,
		QuestionaireModule,
		SchedulingModule
	],
	declarations:[
		QuerySection,
		QueriesSection,
		ReportingScheduleSection,
		ReportingSchedulesOverviewSection
	],
	exports:[
		QuerySection,
		QueriesSection,
		ReportingScheduleSection,
		ReportingSchedulesOverviewSection
	]
})
export class SectionsModule{}



export * from './query/query.component'
export * from './queries/queries.component'
export * from './reporting-schedules-overview/reporting-schedules-overview.component'
export * from './reporting-schedule/reporting-schedule.component'
