import	{	
			Component,
			Input
		}						from  '@angular/core'

@Component({
	selector:     'rcc-query',
	templateUrl:   './query.component.html',
	styleUrls:     []
})
export class QueryComponent {
	@Input() query

	constructor(){

	}
}