import	{ 	
			Component, 
			OnInit,
			Input,
			ViewChild,
		} 							from '@angular/core'
import	{
			FormControl
		}							from '@angular/forms'
import	{
			ModalController
		}							from '@ionic/angular'
import	{
			ZXingScannerComponent
		}							from '@zxing/ngx-scanner'
import 	{ 
			Result 
		} 							from '@zxing/library'


@Component({
	selector: 'rcc-qr-code-scanner',
	templateUrl: './qr-code-scanner.component.html',
	styleUrls: ['./qr-code-scanner.component.scss'],
})
export class QrCodeScannerComponent implements OnInit {
	@Input() title	

	@ViewChild('scanner', {static: true})
	scanner: ZXingScannerComponent

	hasPermission: 		boolean

	compareDevices:		(d1:MediaDeviceInfo,d2:MediaDeviceInfo) => boolean

	availableDevices: 	MediaDeviceInfo[]	= []
	currentDevice: 		FormControl			= new FormControl()


	constructor(
		private modalController:ModalController
	) { }

	dismiss(result){
		this.modalController.dismiss(result)
	}
	

	ngOnInit(): void {

		this.compareDevices = (device1, device2) => device1 && device2 ? device1.deviceId === device2.deviceId : device1 === device2

		this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {			
			this.availableDevices 	= devices

			for (const device of devices) {
					if (/back|rear|environment/gi.test(device.label)) {
							this.currentDevice.setValue(device)
							break
					}
			}
		})

		this.scanner.camerasNotFound
		.subscribe(() 				=> this.availableDevices	= [])

		this.scanner.scanSuccess
		.subscribe( result => this.dismiss(result))

		this.scanner.permissionResponse
		.subscribe((perm: boolean) 	=> this.hasPermission		= perm)


		
	}

}
