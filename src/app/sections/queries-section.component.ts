import { 	Component } 		from '@angular/core';
import { 	Questionaire }		from '../questionaire'
import { 	ReportingService }	from '../reports'
import { 	SchedulingService }	from '../services'

@Component({	
	templateUrl:	'./queries-section.component.html',
	styleUrls:		['./queries-section.component.scss'],
})
export class QueriesSection {

	public queries = []

	constructor(
		private questionaire: 		Questionaire,
		private reportingService: 	ReportingService,
		private schedulingService: 	SchedulingService,
	){

		Promise.resolve(schedulingService.getDue())
		.then(ids 		=> this.reportingService.createQueryRun(ids))
		.then(queries	=> this.queries = queries)
		.catch( e => {console.log(e); throw e})

	}
	
}
