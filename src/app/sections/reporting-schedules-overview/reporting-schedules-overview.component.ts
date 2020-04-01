import { Component, OnInit } 		from '@angular/core'
import { SchedulingService }		from '../../schedules'


@Component({
  selector: 	'app-reporting-schedules-overview',
  templateUrl: 	'./reporting-schedules-overview.component.html',
  styleUrls: 	['./reporting-schedules-overview.component.scss'],
})
export class ReportingSchedulesOverviewSection implements OnInit {

	public reportingSchedules

	constructor(
		private schedulingService: SchedulingService
	) { 
		this.schedulingService.getReportingSchedules()
		.then( reportingSchedules => this.reportingSchedules = reportingSchedules )
	}

	ngOnInit() {}

}
