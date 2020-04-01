import 	{ 
			Component, 
			OnInit 
		} 						from '@angular/core'

import	{
			ActivatedRoute
		}						from '@angular/router'

import	{
			ReportingService
		}						from '../../reports'

@Component({
  selector: 	'app-query',
  templateUrl: 	'./query.component.html',
  styleUrls: 	['./query.component.scss'],
})
export class QuerySection implements OnInit {

	public query

	constructor(
		ActivatedRoute:		ActivatedRoute,
		ReportingService:	ReportingService
	) { 
		ActivatedRoute.paramMap.subscribe({
			next: params => 	ReportingService.getQueries([params.get('id')])
								.then( ([query]) => this.query = query)
		})
	}

	ngOnInit() {}

}
