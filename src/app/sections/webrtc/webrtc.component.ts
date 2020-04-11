import 	{ 	
			Component, 
			OnInit 
		} 							from '@angular/core'
import	{	
			webSocket, 
			WebSocketSubject
		} 							from 'rxjs/webSocket'
import	{
			RccConnectionService
		}							from '../../rcc-connection/rcc-connection.service'




@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss'],
})
export class WebRTCSection {

	public status =[]

	constructor(private RccConnectionService:RccConnectionService){
	}

	open(){
		let connection = this.RccConnectionService.connect('test', 'mySecret')
		
		connection.statusChanges.subscribe({
			next: 		x 	=> this.status.push(x),
			error: 		e	=> console.log(e),
			complete:	()	=> console.log('COMPLETE')
		})

		connection.open().then( () => this.status.push('END OPEN') )

	}

	listen(){
		let connection = this.RccConnectionService.connect('test', 'mySecret')
		
		connection.statusChanges.subscribe({
			next: 		x 	=> this.status.push(x),
			error: 		e	=> this.status.push('ERROR: '+e),
			complete:	()	=> console.log('COMPLETE')
		})

		connection.listen().then( () => this.status.push('END LISTEN') )
	}
}

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss'],
})
export class XXXWebRTCSection {

	myWebSocket: WebSocketSubject<any>
	server
	pc
	dc
	offer
	answer

  	constructor() { 
		this.myWebSocket = webSocket('ws://78.46.180.128:9090')

		this.myWebSocket.asObservable().subscribe({
			next: msg => {
				console.log('websockets:',msg)
				if(msg.offer){
					this.offer = msg.offer
					console.log('offer received!')
				}
				if(msg.answer){
					this.answer = msg.answer
					console.log('answer received!')					
				}

			}
		})

		


		this.server       		= { urls: "stun:stun.l.google.com:19302" };
		this.pc 				= new RTCPeerConnection({iceServers: [this.server]})

		this.pc.oniceconnectionstatechange = e => {
			var state = this.pc.iceConnectionState
			console.log(state)
		}

		this.pc.onicecandidate = e => {
			console.log('onicecandidate')
  			//console.log(this.pc.localDescription)
  			if (e.candidate) return;
		}

		this.pc.ondatachannel = (e) => { 
			e.channel.onmessage = m => console.log(m.data)
		}

		this.createOfferSDP()

		this.login()
	}

	createOfferSDP() {
		console.log('create offer')
		this.dc = this.pc.createDataChannel("chat");
		this.pc.createOffer()
		.then( e => {
			this.pc.setLocalDescription(e)			
		})
		this.dc.onopen = () =>{ console.log('data channel open!')}
		
		this.dc.onmessage = function(e) {
			console.log('message! ', e.data)
		}
	}

	sendAnswer() {
		var offerDesc = new RTCSessionDescription(this.offer)
		
		console.log(offerDesc)

		this.pc.setRemoteDescription(offerDesc)
		this.pc.createAnswer()
		.then(
			answerDesc => {
				this.pc.setLocalDescription(answerDesc)
				this.myWebSocket.next({					
					type: 'answer',
					answer: answerDesc,
					name: 'test'
				})
			}, 
			function (e) {console.warn("Couldn't create offer",e)}			
		)
	}

	useAnswer(){
		var answerDesc = new RTCSessionDescription(this.answer)
  		this.pc.setRemoteDescription(answerDesc)
	}

	login(){
		this.myWebSocket.next({
			type: 	'login',
			name:	'test'
		})
	}

	sendOffer() {
		console.log('send offer')
		this.myWebSocket.next({
			type: 'offer',
			offer: this.pc.localDescription,
			name: 'test'
		})


		//var answerSDP 	= $('#joiner-sdp').val()
		//var answerDesc 	= new RTCSessionDescription(JSON.parse(answerSDP));
		//pc.setRemoteDescription(answerDesc);
	}



	sendMSG = function(value) {
		this.dc.send(value)
		console.log(value, "me")
	}

//$("#send").click(sendMSG);




  ngOnInit() {}

}
