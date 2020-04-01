import 	{ 	
			Component, 
			ComponentRef, 
			OnInit, 
			AfterViewInit,
			Input,
			ViewChild
		}     								from '@angular/core'
import 	{ 	IonSlides } 					from '@ionic/angular';
import	{	
			Query
		}									from '../reports'



@Component({
	selector:     'query-run',
	templateUrl:   './query-run.component.html',
	styleUrls:     ['./query-run.component.scss']
})
export class QueryRunComponent {

	public slideOpts = 	{
							initialSlide:	0,
							speed:			400,
						}

	@ViewChild(IonSlides,	{static:true}) 	slides: IonSlides

	@Input() queries:Query[] = []

	public	atStart:			boolean 	= true
	public	atEnd:				boolean 	= false
	public 	activeQuery:		Query 

	private queryOnSlide:		Query[] 	= []

	constructor() {
		
	}

	public get trackSlides(){
		return 	function(index, query){
					this.queryOnSlide[index] = query
					return query		
				}.bind(this)
	}

	public checkOff(){
		let activeQuery	= this.activeQuery

		this.activeQuery.submit()
		.then( () => (activeQuery == this.activeQuery) && this.slides.slideNext() )
	}

	public afterSlideChange(){

		this.slides.isBeginning()
		.then( result => this.atStart = result )

		this.slides.isEnd()
		.then( result => this.atEnd = result )

		this.slides.getActiveIndex().then( index => this.activeQuery = this.queryOnSlide[index] )
	}


}

