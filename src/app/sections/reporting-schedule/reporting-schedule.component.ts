import 	{ 
			Component, 
			OnInit 			
		} 							from '@angular/core'
import	{
			ActivatedRoute,
			ParamMap
		}							from '@angular/router'
import	{
			ModalController
		}							from '@ionic/angular'
import	{
			from
		}							from 'rxjs'
import 	{ 	
			switchMap			
		} 							from 'rxjs/operators';		
import 	{
			SchedulingService
		}							from '../../schedules'

import	{
			QrSendDataComponent
		}							from '../../modals'
import	{
			RccConnectionService	
		}							from '../../rcc-connection/rcc-connection.service'

import	{
			Questionaire
		}							from '../../questionaire'


@Component({
  selector: 'app-reporting-schedule',
  templateUrl: './reporting-schedule.component.html',
  styleUrls: ['./reporting-schedule.component.scss'],
})
export class ReportingScheduleSection implements OnInit {

	public index
	public reportingSchedule
	public connectionStatus		

	constructor(
		private schedulingService: 		SchedulingService,
		private activatedRoute:			ActivatedRoute,
		private modalController: 		ModalController,
		private rccConnectionService:	RccConnectionService,
		private questionaire:			Questionaire
	){}


	public async shareQR() {

		const channel 		= 	await window.crypto.subtle.generateKey(
									{
										name: "AES-GCM",
										length: 256
									},
									true,
									["encrypt", "decrypt"]
								) 	//TODO: create crypto service
								.then( key => window.crypto.subtle.exportKey("raw",key))
								.then( raw => btoa(String.fromCharCode(...new Uint8Array(raw))))
								//todo: use crypto service


		const secret		= 	await window.crypto.subtle.generateKey(
									{
										name: "AES-GCM",
										length: 256
									},
									true,
									["encrypt", "decrypt"]
								) 	//TODO: create crypto service
								.then( key => window.crypto.subtle.exportKey("raw",key))
								.then( raw => btoa(String.fromCharCode(...new Uint8Array(raw))))
								//todo: use crypto service


		const connection 	= this.rccConnectionService.connect(channel, secret)
		const modal 		= await this.modalController.create({
									component:		QrSendDataComponent,
									componentProps:	{
														title:		'Download Reporting Schedule',
														data:		{channel, secret},
														connection:	connection
													}
								})

		modal.onWillDismiss().then( () => connection.cancel() )

		//TODO encryption!

		connection.message$.subscribe({
			next: message => console.log('MESSGAE;', message)
		})


		const questions 		= await this.questionaire.getQuestions(this.reportingSchedule.questionIds)
		const question_configs	= questions.map( question => question.config )

		await 	modal.present()
		await 	connection.open()
		
		await 	connection.announce(['reporting_schedule', 'questions'])		
		await	connection.send({
					type:				'reporting_schedule', 
					reporting_schedule:	this.reportingSchedule.config 
				})		
		await 	connection.send({
					type:				'questions',
					questions:			question_configs
				})

		return ;
	}


	ngOnInit() {
		this.activatedRoute.paramMap
		.subscribe({
			next: (params: ParamMap) => 	this.schedulingService.getReportingSchedule(parseInt(params.get('index')))
											.then( rs => this.reportingSchedule = rs) 	
		}) //will unsubscribe automaticcaly as part of route
  	}

}
