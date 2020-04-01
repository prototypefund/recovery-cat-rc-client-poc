import	{	NgModule }		from '@angular/core'
import	{	QuestionPipe }	from './questionaire.pipes'



@NgModule({

	declarations: [
		QuestionPipe
	],
	exports: [
		QuestionPipe
	]
	
})
export class QuestionaireModule {}