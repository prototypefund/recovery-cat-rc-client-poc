import 	{ 
			Component, 
			OnInit,
			Input 
		} 						from '@angular/core'
import	{
			ModalController
		}						from '@ionic/angular'

import 	{
			Question
		}						from '../../questionaire'
import 	{
			ReportingSchedule
		}						from '../../schedules'


@Component({
	selector: 'app-receive-data',
	templateUrl: './receive-data.component.html',
	styleUrls: ['./receive-data.component.scss'],
})
export class ReceiveDataComponent implements OnInit {

	@Input() connection

	complete				: boolean 				= false

	questions				: Question[]			= []
	reportingSchedules		: ReportingSchedule[]	= []

	constructor(
		private modalController:	ModalController,
	) { }

	dismiss(){
		this.connection.cancel()
		this.modalController.dismiss()
	}

	ngOnInit() {
		if(!this.connection) return null
		this.connection.statusChange$.subscribe({
			complete: 	()	=> this.complete = true
		})

		this.connection.message$.subscribe({
			next: message => {
				console.log('receibingsdjsf', message.type)
				switch(message.type){
					case('reporting_schedule'):
						this.reportingSchedules.push(new ReportingSchedule(message.reporting_schedule))
					break

					case('questions'):
						message.questions.forEach( config => this.questions.push(new Question(config)))
					break
				}
			}
		})
	}

}
