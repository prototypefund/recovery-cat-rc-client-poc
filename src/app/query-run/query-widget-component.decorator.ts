import	{	Component }				from '@angular/core'
import	{	QWCService }			from './query-widget-components.service'
import	{	Question }				from '../questionaire/question.class'


interface GetWidgetMatch { (Question):number }

export function RegisterQWC(args:{getWidgetMatch:GetWidgetMatch}): (cls: any) => void {

	return function (target: any) {
		QWCService.registerQWCConfig({
			component:		target, 
			getWidgetMatch:	args.getWidgetMatch
		})
	}

}
