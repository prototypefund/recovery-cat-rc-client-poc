import	{	Injectable }				from '@angular/core'
import	{	
			ReportingSchedule,
			ReportingScheduleConfig
		}								from './reporting-schedule.class'

import 	{	
			RRule, 
			RRuleSet, 
			rrulestr 
		} 								from 'rrule'


@Injectable({
	providedIn:'root'
})

export class SchedulingService{

 	private 		reportingSchedules:	ReportingSchedule[] = []
 	public			ready: 				Promise<any>

	constructor(){
		this.ready 	=	this.restoreReportingSchedulesFromStorage()
						.then( data	=> this.reportingSchedules = data) 
						.then( () 	=> Promise.resolve() )
	}


	public async getDue(date_1?:Date, date_2?:Date):Promise<string[]>{
		await this.ready

		if(!date_1){
			date_1 = new Date()
			date_1.setUTCHours(0,0,0,0)
		}

		if(!date_2){
			date_2 = new Date(date_1.getTime())
			date_2.setUTCHours(24,0,0,0) 
		}

		let result_array = 	this.reportingSchedules
							.map( reportingSchedule => reportingSchedule.getDue(date_1, date_2))
							.flat()

		let result_array_unique = [...new Set(result_array)]

		return 	result_array_unique
				
	}

	public async getReportingSchedules(): Promise<ReportingSchedule[]>{
		await this.ready
		return this.reportingSchedules
	}

	
	public async getReportingSchedule(index:number): Promise<ReportingSchedule|null>{
		await this.ready
		
		if(this.reportingSchedules[index] == undefined) throw "Unable to find ReportingSchedule at index "+index

		return 	this.reportingSchedules[index]
	}


	public async addReportingSchedule(rsConfig: ReportingScheduleConfig):Promise<any> {
		await this.ready		

		this.reportingSchedules.push(new ReportingSchedule(rsConfig))
		return this.storeReportingSchedule(rsConfig)
	}


	private async storeReportingSchedule(rsConfig: ReportingScheduleConfig):Promise<any> {
		return null
		await this.ready
	}


	private async restoreReportingSchedulesFromStorage():Promise<any> {
		let data = mock_data

		return data.map( rsConfig => new ReportingSchedule(rsConfig) )
	}


}


let mock_data = [
	[
		[
			'Dr. Whatsnot',
			'2020-01-01T12:15:30.000Z',
			RRule.optionsToString({
				freq: 		RRule.DAILY,
				dtstart: 	new Date(Date.UTC(2020, 1, 1, 16, 30)),
				byhour:		18
			})
		],

		['A', 'B']	
	],


	[
		[
			'Dr. Who',
			'2020-03-11T16:45:30.000Z',
			RRule.optionsToString({
				freq: 		RRule.WEEKLY,
				byweekday: 	[RRule.MO, RRule.TU, RRule.WE, RRule.TH, RRule.FR],
				byhour:		10
			})	
		],

		[
			[
				'C', 
				RRule.optionsToString({
					freq: 		RRule.DAILY,
					byhour:		[10, 18]
				})
			], 
			'D'
		] 	
	],


	[
		[
			'Dr. Scully',
			'2020-03-18T09:45:30.000Z',
			RRule.optionsToString({
				freq: 		RRule.DAILY,
				interval:	2,
			})
		],

		['C', 'D', 'E']	
	],

]





