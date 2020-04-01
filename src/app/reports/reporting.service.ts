import	{	Injectable }	from '@angular/core'
import	{	Questionaire }	from '../questionaire'
import	{	Query }			from './query.class'

export interface Report{
	[index:number]: string|number
	0: 	string			//Question id
	1: 	string|number	//Answer 
	2: 	number			//timestamp
}

@Injectable({
	providedIn: 'root'
})
export class ReportingService{

	private reports:Report[] = []

	public ready: Promise<any>

	//Todo save to some storage

	constructor(
		private Questionaire: Questionaire
	){

		this.ready = Promise.resolve()
	}


	async getQueries(ids: string[]): Promise<Query[]> {

		await this.ready

		let questions 	= await this.Questionaire.getQuestions(ids)
		let queries		= questions.map(question => new Query( question, this.submitQuery.bind(this)) )

		return queries
	}


	submit(id: string, value: string|number, date?:Date){

		console.log('Answer submitted:', id, value)

		this.reports.push([
			id,
			value,
			date && date.valueOf() || Date.now()
		])
	}

	submitQuery(query:Query){
		return this.submit(query.question.id, query.answer, query.date )
	}

	get():Report[]{
		return this.reports
	}

}