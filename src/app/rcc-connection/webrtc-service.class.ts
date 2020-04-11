import	{	
			WebRTCInterface,
			Message 
		}									from './rcc-connection.class'
import	{	
			Subject,
			Observable 
		}									from 'rxjs'
import	{	
			timeout,
			take,
			map
		}									from 'rxjs/operators'

export class WebRTCService implements WebRTCInterface{

	private pc
	private sendingChannel
	private receivingChannel
	private iceCandidates			: Subject<any> 			= new Subject()
	private	messages				: Subject<Message>		= new Subject()
	private statusChanges			: Subject<string>		= new Subject()
	private resolveSending 
	private rejectSending
	private sendingChannelReady		: Promise<any>			= new Promise( (s,j) => { this.resolveSending = s; this.rejectSending = j })
	private resolveReceiving
	private rejectReceiving
	private	receivingChannelReady	: Promise<any>			= new Promise( (s,j) => { this.resolveReceiving = s; this.rejectReceiving = j })

	public 	iceCandidate$			: Observable<any>		= this.iceCandidates.asObservable()
	public	message$				: Observable<Message>	= this.messages.asObservable()


	constructor(
		private stunServers, 
		private	baseTimeout: number = 10000
	){
		this.setup()
	}

	private setup(){
		this.pc	= new RTCPeerConnection({iceServers: [this.stunServers]})
		
		this.pc.oniceconnectionstatechange = e => {
			//TODO?
		}

		this.pc.onicecandidate 	= event => { this.iceCandidates.next(event.candidate) }

		this.pc.ondatachannel 	= event => {
			this.receivingChannel = event.channel	
			this.receivingChannel.onmessage = event => this.messages.next(JSON.parse(event.data)) //TODO atch parsing errors
			this.resolveReceiving()
		}


		this.sendingChannel = this.pc.createDataChannel("rcc-data")

		this.sendingChannel.onopen = this.resolveSending

		this.sendingChannel.onmessage = function(e) {
			console.log('sending channel message! ', e.data) //TODO will this ever happen?
		}

	}

	//TODO: handleSendChannelStatusChange
	//TODO: handleReceiveChannelStatusChange



	public async createOffer(): Promise<any> {		

		let offer 	= await this.pc.createOffer()

		this.pc.setLocalDescription(offer)				

		return offer

	}

	public async createAnswer(offer): Promise<any>{

		this.pc.setRemoteDescription(offer)

		let answer	= await this.pc.createAnswer().catch( e => console.log(e)) //TODO
		
		this.pc.setLocalDescription(answer)
		
		return answer

	}

	public async applyAnswer(answer): Promise<any> {
		return this.pc.setRemoteDescription(answer)		//Todo wait for outcome?
	}

	public async addIceCadidate(candidate):Promise<any> {
		return 	this.pc.addIceCandidate(candidate)
				.catch(console.log) 		//Todo
	}

	public async waitForDataChannels(timeout = this.baseTimeout){
		return 	Promise.race([
					new Promise( (resolve, reject) => setTimeout( () => reject('TIMEOUT'), timeout) ),
					Promise.all([
						this.sendingChannelReady,
						this.receivingChannelReady
					])
				])
				
	}

	public async send(message:Message): Promise<any>{
		await this.waitForDataChannels()
		await this.sendingChannel.send(JSON.stringify(message))
	}

	public async close(): Promise<any>{
		this.pc.close()
	}
}


