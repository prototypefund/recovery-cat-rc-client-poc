import 	{	
			RRule, 
			RRuleSet, 
			rrulestr 
		} 					from 'rrule'


export type ReportingScheduleConfig = any[][]



export class ReportingSchedule{

	
	private _config

	public source
	public start
	public defaultRRule
	public data


	constructor(
		config: ReportingScheduleConfig
	){
		this.setup(config)
	}

	private setup(config: ReportingScheduleConfig){
		this._config 		= 	config
		this.source			= 	config[0][0]
		this.start			= 	new Date(config[0][1])
		this.defaultRRule	= 	new RRule( {dtstart: this.start, ...RRule.parseString(config[0][2]) } )
		this.data			= 	config[1].map( 
									item => 	typeof item == 'string'
												?	{id: item,		RRule: this.defaultRRule }
												:	{id: item[0], 	RRule: new RRule( {dtstart: this.start, ...RRule.parseString(item[1]) } ) }
								)
	}

	public getDue(date_1:Date, date_2:Date): string[]{

		return 	this.data
				.map( 		item => item.RRule.between(date_1, date_2, true).length > 0 && item.id )
				.filter( 	item => typeof item == 'string')
	}

	get config()		{ return this._config }
	get questionIds()	{ return this.data.map( item => item.id) }
	

}


