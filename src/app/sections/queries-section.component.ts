import { 	Component } 		from '@angular/core';
import { 	Questionaire }		from '../questionaire'

@Component({	
	templateUrl:	'./queries-section.component.html',
	styleUrls:		['./queries-section.component.scss'],
})
export class QueriesSection {

	public questions = []

	constructor(questionaire: Questionaire){

		questionaire.getQuestions(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
		.subscribe({
			next: q => this.questions.push(q)
		})

	}
	
}
