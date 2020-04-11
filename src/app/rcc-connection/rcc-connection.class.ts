import	{	
			Observable, 
			Subject
		}							from 'rxjs'

import 	{
			filter,
			map
		}							from 'rxjs/operators'



export interface Message {
	[index:string]	: string
	type			: string
}

export interface SignalingInterface {

	iceCandidate$:			Observable<any>

	join:					()			=> Promise<any>
	waitForSecondParty:		(timeout?)	=> Promise<any>	
	waitForOffer:			(timeout?)	=> Promise<any>	
	sendOffer:				(offer)		=> Promise<any>
	confirmOfferReceipt:	()			=> Promise<any>
	waitForOfferReceipt:	(timeout?)	=> Promise<any>
	waitForAnswer:			(timeout?)	=> Promise<any>
	sendAnswer:				(answer)	=> Promise<any>
	waitForAnswerReceipt:	(timeout?)	=> Promise<any>
	confirmAnswerReceipt:	()			=> Promise<any>
	sendCandidate:			(candidate)	=> Promise<any>
	close:					()			=> Promise<any>
}

export interface WebRTCInterface {

	iceCandidate$:			Observable<any>
	message$:				Observable<any>

	createOffer:			() 					=> Promise<any>
	createAnswer:			(offer)				=> Promise<any>
	applyAnswer:			(answer)			=> Promise<any>
	waitForDataChannels:	(timeout?)			=> Promise<any>
	addIceCadidate:			(candidate)			=> Promise<any>
	send:					(message:Message)	=> Promise<any>
	close:					()					=> Promise<any>		
}


export class RccConnection{

	private	canceled				: Promise<any>			= new Promise( (s,reject) => this.cancel = () => reject('USER_CANCELED'))

	public 	status 					: string
	public 	statusChanges			: Subject<string>		= new Subject()
	public 	statusChange$			: Observable<string>	= this.statusChanges.asObservable()


	private localAnnouncements		: string[]				= []
	private localReceipts			: string[]				= []
	private remoteAnnouncements		: string[]				= []	
	private remoteReceipts			: string[]				= []

	public 	cancel

	constructor(
		private secret		: string,
		private signaling	: SignalingInterface,
		private	webrtc		: WebRTCInterface
	) {
		this.setup()
	}

	private setup(){

		this.statusChange$.subscribe({next: console.log})

		this.webrtc.iceCandidate$.subscribe({
			next: candidate => this.signaling.sendCandidate(candidate)
		}) //TODO: unsubscribe?

		this.signaling.iceCandidate$.subscribe({
			next: candidate => this.webrtc.addIceCadidate(candidate)
		})


		this.message$
		.pipe(
			filter( ({type}) 		=> type == 'announcement'),
			map(	message			=> message.announce)
		)
		.subscribe(this.addRemoteAnnouncements.bind(this))


		this.message$
		.pipe(
			filter( ({type}) 		=> type == 'receipt'),
			map(	message			=> message.received)
		)
		.subscribe(this.addRemoteReceipt.bind(this))


		this.message$
		.subscribe({
			next:	message 		=>  !['receipt', 'announcement'].includes(message.type) && this.confirmReceipt(message.type)
		})
	}

	get message$(){ return this.webrtc.message$ }

	//TODO cancel wrapper?

	//TODO teardown!! 

	//TODO: try avoiding signaling server on local network?
	
	//TODO maybe request offert to restart the whole process?

	public async close(){ //TODO check if everythig got through and stuff
		//teardown... this.close()?

		//not good, wait for receipts!
		this.statusChanges.complete()
	}

	public async open() {

		try {
		
			this.statusChanges.next(this.status = 'joining_signaling_channel')
			await 	Promise.race([
						this.canceled,
						this.signaling.join() 	 			//Todo: retry ... channel 2...
					])


			this.statusChanges.next(this.status = 'waiting_for_second_party')
			await 	Promise.race([
						this.canceled,
						this.signaling.waitForSecondParty(),
					])

			this.statusChanges.next(this.status = 'creating_offer')
			let offer = await  	this.webrtc.createOffer() 

			this.statusChanges.next(this.status = 'sending_offer')
			await  	this.signaling.sendOffer(offer) 

			this.statusChanges.next(this.status = 'waiting_for_offer_receipt')
			await  	Promise.race([
									this.canceled,
									 this.signaling.waitForOfferReceipt()
								])
			
			this.statusChanges.next(this.status = 'waiting_for_answer')
			let answer = await  Promise.race([
									this.canceled,
									this.signaling.waitForAnswer()
								])

			this.statusChanges.next(this.status = 'confirming_answer_receipt')
			await   this.signaling.confirmAnswerReceipt()			

			this.statusChanges.next(this.status = 'applying_answer')
			await  	this.webrtc.applyAnswer(answer)

			this.statusChanges.next(this.status = 'waiting_for_data_channel')
			await   Promise.race([
						this.canceled,
						this.webrtc.waitForDataChannels()
					])

			this.statusChanges.next(this.status = 'closing_signaling_connection')
			await this.signaling.close()

			this.statusChanges.next(this.status = 'ready')

		} catch(e) {

			//TODO same for listen!
			this.statusChanges.error(e)
			throw e

		}

		// this.statusChanges.next(this.status = 'sending_hello_on_data_channel')
		// let helloX = await this.webrtc.sendHello()

		// this.statusChanges.next(this.status = 'waiting_for_hello_receipt_on_data_channel')
		// await this.webrtc.waitForHelloReceipt(helloX)

		// this.statusChanges.next(this.status = 'sending_for_hello_receipt_2_on_data_channel')
		// await this.webrtc.sendHelloReceipt(helloX*2)		



		return true //datachannel?
	

		// 	this.statusChanges.next(this.status = 'leaving_signaling_channel')
		// 	return this.signaling.leave()
		// })
		// .then( ()	=> {
		// 	return this.statusChanges.next(this.status = 'data_channel_open')
		// })		
	}

	public async listen() {
		try {
			this.statusChanges.next(this.status = 'joining_signaling_channel')
			await  	Promise.race([
						this.canceled,
						this.signaling.join()
					])

			this.statusChanges.next(this.status = 'waiting_for_offer')
			let offer = await  	Promise.race([
									this.canceled,
									this.signaling.waitForOffer()
								])
			
			this.statusChanges.next(this.status = 'confirming_offer_receipt')			
			await this.signaling.confirmOfferReceipt()			

			this.statusChanges.next(this.status = 'creating answer')			
			let answer = await  this.webrtc.createAnswer(offer)							

			this.statusChanges.next(this.status = 'sending_answer')
			await  	this.signaling.sendAnswer(answer)
					

			this.statusChanges.next(this.status = 'waiting_for_answer_receipt')
			await   Promise.race([
						this.canceled,
						this.signaling.waitForAnswerReceipt()
					])

			this.statusChanges.next(this.status = 'waiting_for_data_channel')
			await  	Promise.race([
						this.canceled,
						this.webrtc.waitForDataChannels()
					])

			this.statusChanges.next(this.status = 'closing_signaling_connection')
			await	this.signaling.close()


			this.statusChanges.next(this.status = 'ready')

			// this.statusChanges.next(this.status = 'waiting_for_hello_on_data_channel')
			// let helloX = await this.webrtc.waitForHello()		

			// this.statusChanges.next(this.status = 'sending_hello_receipt_on_data_channel')
			// await this.webrtc.sendHelloReceipt(helloX)

			// this.statusChanges.next(this.status = 'waiting_for_hello_receipt_2_on_data_channel')
			// await this.webrtc.waitForHelloReceipt(helloX*2)
		} catch(e) {
			this.statusChanges.error(e)
			throw e
		}

		return null //dc?
		
	}

	public get send()		{ return this.webrtc.send.bind(this.webrtc) }


	private covers(arr1: string[], arr2: string[]){
		if(arr1.length < arr2.length) 	return false
		if(arr2.length == 0)			return true 

		let uncovered = {}

		arr2.forEach( value => uncovered[value] = (uncovered[value] || 0) + 1)
		arr1.forEach( value => uncovered[value] = (uncovered[value] || 0) - 1)

		return Object.values(uncovered).reduce( (result, value) => result && value <= 0, true)
	}

	private allAnnouncementsArrived(){
		if(
			this.remoteAnnouncements.length	== 0
			&&
			this.localAnnouncements.length	== 0
		) return false

		return	this.covers(this.localReceipts, this.remoteAnnouncements)
				&&
				this.covers(this.remoteReceipts, this.localAnnouncements)
	}

	public async announce(message_types){
		await this.send({
			type:		'announcement',
			announce:	message_types
		})
		this.localAnnouncements.push(...message_types)
	}

	public async confirmReceipt(message_type){
		await this.send({
			type:		'receipt',
			received:	message_type
		})
		this.localReceipts.push(message_type)
		if(this.allAnnouncementsArrived()) this.complete()
	}


	private addRemoteAnnouncements(message_types){
		this.remoteAnnouncements.push(...message_types)

	}

	private addRemoteReceipt(message_type){
		this.remoteReceipts.push(message_type)
		if(this.allAnnouncementsArrived()) this.complete()
	}


	private async complete(){
		await this.webrtc.close()
		this.statusChanges.complete()
	}



}


