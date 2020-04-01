import 	{ 
			Pipe, 
			PipeTransform,
		}								from '@angular/core'

@Pipe({
	name: 'rccIgnoreTZ'
})
export class rccIgnoreTZPipe implements PipeTransform {

	constructor(){}

	transform(date?: Date): string|any {		
		if(!(date instanceof Date)) return date
		let d = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDay(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())
		return d.toLocaleString('de-DE')
	}
}
