import 	{ 
			Component, 
			OnInit 
		} 							from '@angular/core'
import	{
			ActivatedRoute,
			ParamMap
		}							from '@angular/router'
import	{
			from
		}							from 'rxjs'
import 	{ 	
			switchMap			
		} 							from 'rxjs/operators';		
import 	{
			SchedulingService
		}							from '../../schedules'


@Component({
  selector: 'app-reporting-schedule',
  templateUrl: './reporting-schedule.component.html',
  styleUrls: ['./reporting-schedule.component.scss'],
})
export class ReportingScheduleSection implements OnInit {

	public index
	public reportingSchedule

  constructor(
  	private schedulingService: 	SchedulingService,
  	private activatedRoute:		ActivatedRoute
  ) { 
		
  }

  ngOnInit() {
	this.activatedRoute.paramMap
	.subscribe({
		next: (params: ParamMap) => 	this.schedulingService.getReportingSchedule(parseInt(params.get('index')))
										.then( rs => this.reportingSchedule = rs) 	
	}) //will unsubscribe automaticcaly as part of route
  }

}
