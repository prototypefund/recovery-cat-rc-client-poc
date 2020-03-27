import 	{ 	
			Component, 
			ComponentRef, 
			OnInit, 
			AfterViewInit,
			Input,
			ViewChild
		}     								from '@angular/core'
//import	{	DefaultQueryWidgetComponent	}	from '../fallback-query-widgets/fallback-query-widget.component'
import	{	
			Question,
			Questionaire
		}									from '../questionaire'

import 	{ 	IonSlides } 					from '@ionic/angular';


@Component({
	selector:     'query-run',
	templateUrl:   './query-run.component.html',
	styleUrls:     ['./query-run.component.scss']
})
export class QueryRunComponent implements OnInit, AfterViewInit {

	public slideOpts = 	{
							initialSlide:	0,
							speed:			400,
						}

	@ViewChild(IonSlides,	{static:true}) 	slides: IonSlides

	@Input() questions:Question[] = []

	public	atStart:			boolean 	= true
	public	atEnd:				boolean 	= false
	public 	activeQuestion:		Question 

	private questionOnSlide:	Question[] 	= []

	constructor(private questionaireService:Questionaire) {
		
	}

	get trackSlides(){

		let questionOnSlide = this.questionOnSlide

		return 	function(index, question){
					questionOnSlide[index] = question
					return question		
				}
	}

	checkOff(){
		let activeQuestion	= this.activeQuestion

		this.activeQuestion.store()
		.subscribe({
			complete: () => {	if(activeQuestion == this.activeQuestion) this.slides.slideNext() }
		})
	}

	afterSlideChange(){

		this.slides.isBeginning()
		.then( result => this.atStart = result )

		this.slides.isEnd()
		.then( result => this.atEnd = result )

		this.slides.getActiveIndex().then( index => this.activeQuestion = this.questionOnSlide[index] )
	}


	ngAfterViewInit(){
	}

	ngOnInit() {
	}

}

