import 	{	NgModule } 				from '@angular/core'
import 	{	
			PreloadAllModules, 
			RouterModule, 
			Routes 
		} 							from '@angular/router'

import	{	
			SectionsModule,
			QueriesSection 

		}							from './sections'



const routes: Routes = 	[
							{
								path: 		'query-run',								
								component:	QueriesSection,
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
