import	{	NgModule }			from '@angular/core'
import	{	rccIgnoreTZPipe }	from './scheduling.pipes'



@NgModule({

	declarations: [
		rccIgnoreTZPipe
	],
	exports: [
		rccIgnoreTZPipe
	]
	
})
export class SchedulingModule {}