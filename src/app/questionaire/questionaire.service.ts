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


//TOSO use injector token fpr sources?

@Injectable({
	providedIn: 'root'
})
export class Questionaire {

	static		sourceClasses:	QuestionSourceClass[] 	= []


	private		questions: 		{[index:string]:Question}		= {}
	private		sources:		QuestionSource[]
	public		ready:			Observable<any>	 


	constructor(injector:Injector){

		//this.ready 		= this.restoreQuestionConfigsFromStorage().pipe(ignoreElements())		
		this.sources 	= Questionaire.sourceClasses.map( sourceClass => injector.get(sourceClass) )
	}


	public async addQuestion(config:QuestionConfig):Promise<Question>{
		if(this.questions[config.id] && this.questions[config.id].type != 'unknown') throw 'Questionaire.addQuestion: duplicate question'
		await 	this.storeQuestionConfig(config).toPromise()
		return 	this.questions[config.id] = new Question(config)
	}


	public async getQuestion(id:string):Promise<Question>{
		return this.getQuestions([id]).then( questions => questions[0])
	}

	public async getQuestions(ids:string[]):Promise<Question[]>{

		let todo 	= []
		let done	= {}
		let result	= []

		ids.forEach( 
			id => 	this.questions[id] != undefined
					?	result.push(this.questions[id])
					:	todo.push(id)
		)

		if(todo.length == 0) return result


		let new_configs 	= await	Promise.all(this.sources.map( source => source.get(todo) ))
									.then( res 		=> 	res.flat() )

		let new_questions 	= await	Promise.all(new_configs.map( 
										config => 	done[config.id]
										?	null
										:	(done[config.id] = true) && this.addQuestion(config) 
									))
									.then( res	=> 	res.filter( item => !!item))
			
		result.push(...new_questions)

		ids.forEach( id => !done[id] && result.push( new Question(id) ))

		return result
	}


	private storeQuestionConfig(config: QuestionConfig):Observable<void>{
		return EMPTY
	}

	private restoreQuestionConfigsFromStorage():Observable<QuestionConfig>{
		return EMPTY
	}

}