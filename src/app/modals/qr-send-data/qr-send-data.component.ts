import 	{ 
			Component, 
			OnInit, 
			Input 
		} 						from '@angular/core'

import	{
			ModalController
		}						from '@ionic/angular'

@Component({
	selector: 'rcc-qr-send-data',
	templateUrl: './qr-send-data.component.html',
	styleUrls: ['./qr-send-data.component.scss'],
})
export class QrSendDataComponent implements OnInit {

	@Input() title
	@Input() data
	@Input() connection
	
	public complete = false

	constructor(
		private modalController:ModalController
	) { 

	}

	dismiss(){
		this.connection.cancel()
		this.modalController.dismiss()
	}



	ngOnInit() {
		this.connection.statusChange$.subscribe({
			next: 		() 	=> null,
			error:		()	=> null,
			complete:	()	=> this.complete = true
		})

	}

}
