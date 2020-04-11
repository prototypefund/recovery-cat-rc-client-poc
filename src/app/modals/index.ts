import	{	NgModule }					from '@angular/core'
import	{	CommonModule }				from '@angular/common'
import	{	IonicModule }				from '@ionic/angular'
import	{	QRCodeModule }				from 'angularx-qrcode';
import	{	
			FormsModule,
			ReactiveFormsModule
		}								from '@angular/forms'
import 	{ 	ZXingScannerModule } 		from '@zxing/ngx-scanner'

import	{	QrSendDataComponent }		from './qr-send-data/qr-send-data.component'			
import	{	QrCodeScannerComponent }	from './qr-code-scanner/qr-code-scanner.component'	
import	{	ReceiveDataComponent }		from './receive-data/receive-data.component'
import	{	SchedulingModule }			from '../schedules'


@NgModule({
	imports:[
		IonicModule,
		CommonModule,
		QRCodeModule,
		ZXingScannerModule,
		FormsModule,
		ReactiveFormsModule,
		SchedulingModule
	],
	declarations:[
		QrSendDataComponent,
		QrCodeScannerComponent,
		ReceiveDataComponent
	],
	exports:[
		QrSendDataComponent,
		QrCodeScannerComponent,
		ReceiveDataComponent
	],
	entryComponents:[
		QrSendDataComponent,
		QrCodeScannerComponent,
		ReceiveDataComponent
	]
})
export class ModalsModule{}



export * from './qr-send-data/qr-send-data.component'
export * from './qr-code-scanner/qr-code-scanner.component'
export * from './receive-data/receive-data.component'
