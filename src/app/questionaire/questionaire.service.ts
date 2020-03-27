import 	{ 	
			Injectable,
			Injector
		} 							from '@angular/core'

import 	{ 	
			Observable,
			from,
			concat,
			EMPTY 
		} 							from 'rxjs'

import 	{ 	
			mergeMap,
			map,
			ignoreElements,
			distinct
		} 							from 'rxjs/operators'

			
import	{	Question }				from './question.class'
import	{	QuestionConfig }		from './question-config.interface'

import	{	
			QuestionSource,
			QuestionSourceClass,
		}							from './question-source.service'


@Injectable({
	providedIn: 'root'
})
export class Questionaire {

	static		sourceClasses:	QuestionSourceClass[] 	= []


	private		questions: 		Question[] 				= []
	private		sources:		QuestionSource[]
	public		ready:			Observable<any>	 


	constructor(injector:Injector){

		this.ready 		= this.restoreQuestionConfigsFromStorage().pipe(ignoreElements())		
		this.sources 	= Questionaire.sourceClasses.map( sourceClass => injector.get(sourceClass) )
	}


	public async addQuestion(config:QuestionConfig):Promise<Question>{

		await this.storeQuestionConfig(config).toPromise()

		return this.questions[config.id] = new Question(config) 
	}





	public getQuestions(id_or_ids:string|string[]):Observable<Question>{

		let questions$ =  	new Observable( observer => {

								let ids 	= typeof id_or_ids == 'string' ? [id_or_ids] : id_or_ids
								let todo 	= []
								let done	= {}

								ids.forEach( 
									id => 	this.questions[id] != undefined
											?	observer.next(this.questions[id])
											:	todo.push(id)
								)

								from(this.sources||[])
								.pipe( 
									mergeMap( 	source	=> 	source.get(todo) ),
									distinct(	config	=> 	config.id )
								)
								.subscribe({
									next: 		config 	=> 	{
																done[config.id] = true 
																this.addQuestion(config)
																.then( q => observer.next(q) )
															},
									complete:	()		=> 	ids
															.filter( 	id => !done[id] )
															.forEach( 	id => observer.next(new Question(id)))
								})	

							})

		return concat(this.ready, questions$)
	} 

	private storeQuestionConfig(config: QuestionConfig):Observable<void>{
		return EMPTY
	}

	private restoreQuestionConfigsFromStorage():Observable<QuestionConfig>{
		return EMPTY
	}

}