import 	{	NgModule } 				from '@angular/core'
import 	{	
			PreloadAllModules, 
			RouterModule, 
			Routes 
		} 							from '@angular/router'

import	{	
			SectionsModule,
			QuerySection,
			QueriesSection,
			ReportingSchedulesOverviewSection,
			ReportingScheduleSection,
		}							from './sections'



const routes: Routes = 	[
							{
								path: 		'query-run',								
								component:	QueriesSection,
							},
							{
								path: 		'query/:id',								
								component:	QuerySection,
							},

							{
								path: 		'reporting-schedules',								
								component:	ReportingSchedulesOverviewSection,
							},

							{
								path: 		'reporting-schedules/:index',								
								component:	ReportingScheduleSection,
							},

							{
								path:		'',
								redirectTo:	'query-run',
								pathMatch:	'full'
							}
						]

@NgModule({
	imports: [
		SectionsModule,
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
