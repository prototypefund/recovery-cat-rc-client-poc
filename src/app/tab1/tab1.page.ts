import { Component } 		from '@angular/core';
import { Questionaire }		from '../questionaire'

@Component({
	selector: 'app-tab1',
	templateUrl: 'tab1.page.html',
	styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
	
	public questions = []

	constructor(questionaire: Questionaire){

		questionaire.getQuestions(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
		.subscribe({next: q => this.questions.push(q)})

	}

}
