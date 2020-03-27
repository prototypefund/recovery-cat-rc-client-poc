
import 	{ 	
			Observable,
			from,
			interval,
			concat 
		} 						from 'rxjs'





//todo dynamiccaly add various sheduling schemes (?)


export interface ScheduleConfig {
	dotw: 	number[], //day of the week, starting with sunday
	totd:	number[], //time of the day: night, morning, fornoon noon, afternoon, evening
}


export class Schedule{

	private config: ScheduleConfig

	private timeOfTheDay =	[	
								0,0,0,0,0,0, 	//night 	00-06	
								1,1,1,			//morning 	06-09	
								2,2,2,			//forenoon	09-12
								3,3,			//noon		12-14
								4,4,4,4,		//afternoon	14-18
								5,5,5,5,		//evening	18-22
								0,0				//night		22-00	
							]

	constructor(config: ScheduleConfig){
		this.config = config
	}

	public isDueNow():boolean{
		return this.isDueAtDayAndTime(new Date())
	}

	public isDueAtDay(date:Date):number[]{
		const day_of_the_week 	= date.getDay()

		return	this.config.dotw.includes(day_of_the_week)
				?	this.config.totd
				:	[]
	}

	public isDueAtDayAndTime(date:Date):boolean{		
		const time_of_the_day	= this.timeOfTheDay[date.getHours()]

		return this.isDueAtDay(date).includes(time_of_the_day)
	}



}





export interface ReportingSchedule{
	[index:number]: { 
		questionId: string,
		schedule:	ScheduleConfig
	}
}


export class ReportingScheduleService{

	private reportingSchedules:ReportingSchedule[] = []
	

	constructor(){
		this.restoreReportingSchedulesFromStorage()
	}



	public addReportingSchedule(reportingSchedule: ReportingSchedule):Observable<any> {
		this.reportingSchedules.push(reportingSchedule)
		return this.storeReportingSchedule(reportingSchedule)
	}

	private storeReportingSchedule(reportingSchedule: ReportingSchedule):Observable<any> {
		return from([])
	}

	private restoreReportingSchedulesFromStorage():Observable<any> {
		return from([])
	}



}