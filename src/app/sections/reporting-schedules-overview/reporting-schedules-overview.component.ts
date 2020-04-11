import 	{ 	Component, OnInit } 	from '@angular/core'
import 	{ 	SchedulingService }		from '../../schedules'
import	{
			ModalController
		}							from '@ionic/angular'
import	{
			filter
		}							from 'rxjs/operators'
import	{
			QrCodeScannerComponent,
			ReceiveDataComponent
		}							from '../../modals'
import	{
			RccConnectionService	
		}							from '../../rcc-connection/rcc-connection.service'

import	{
			Questionaire
		}							from '../../questionaire'


@Component({
	selector: 		'app-reporting-schedules-overview',
	templateUrl:	'./reporting-schedules-overview.component.html',
	styleUrls: 		['./reporting-schedules-overview.component.scss'],
})
export class ReportingSchedulesOverviewSection implements OnInit {

	public reportingSchedules
	public config
	public data

	constructor(
		private schedulingService: 		SchedulingService,
		private modalController:		ModalController,
		private rccConnectionService:	RccConnectionService,
		private questionaire:			Questionaire	
	) {}


	//TODO make this a global directive:

	public async scanQR() {

		const modal = await this.modalController.create({
			component:		QrCodeScannerComponent,
			componentProps:	{
								title:		'Scan QR-Code',
							}
		})

		modal.onDidDismiss().then( result => {
			//TODO: check if data is useful first!
			this.getData(JSON.parse(result.data)) //TODO JSON
		})

		return await modal.present()
	}

	public async getData(config){
		console.log(config)

		const connection = this.rccConnectionService.connect(config.channel, config.secret)

		connection.statusChanges.subscribe({
			next: 		x 	=> console.log(x),
			error: 		e	=> console.log(e),
			complete:	()	=> console.log('COMPLETE')
		})

		const modal = await this.modalController.create({
			component:		ReceiveDataComponent,
			componentProps:	{
								title:		'Receiving Data',
								connection:	connection
							}
		})

		await modal.present()

		await connection.listen()

		connection.message$
		.subscribe({
			next: message => {
				console.log('MESSGAE;', message)
				switch(message.type){
					case 'reporting_schedule': 
						this.schedulingService.addReportingSchedule(message.reporting_schedule) 
					break

					case 'questions':
						message.questions.forEach( config => this.questionaire.addQuestion(config) )
					break	
				}
			}
		})

		//return ...
	}

	ngOnInit() {
		this.schedulingService.getReportingSchedules()
		.then( reportingSchedules => this.reportingSchedules = reportingSchedules )
	}

}
