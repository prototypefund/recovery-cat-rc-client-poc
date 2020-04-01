import 	{ 	
			Inject,
			Component,
		}									from '@angular/core'
import	{	
			QueryToken,					
			RegisterQWC 
		}									from '../query-run'
import	{	Query }							from '../reports'


@RegisterQWC({
	getWidgetMatch: question => question.type == 'unknown' ? 1 : -1
})
@Component({
	selector:     'fallback-query-widget-unknown',
	templateUrl:   './fallback-query-widget-unknown.component.html',
	styleUrls:     ['./fallback-query-widget.component.scss']
})
export class FallbackQueryWidgetUnknownComponent {

	public query: 	Query

	constructor(@Inject(QueryToken) query: Query){
		this.query  = query
	}
}

