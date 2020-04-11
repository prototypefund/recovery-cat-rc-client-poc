
import	{	SignalingInterface }		from './rcc-connection.class'
import	{
			Observable,
			Subject
		}								from 'rxjs'
import	{	
			webSocket, 
			WebSocketSubject
		} 								from 'rxjs/webSocket'

import	{	
			take,
			filter,
			timeout,
		}								from 'rxjs/operators'

export class SignalingService implements SignalingInterface{


	//TODO SSL on Server!! Refuse connection otherwise!
	//Make Sever disconnect after 1 minute or so
	//one client can only be in one channel


	private	url:				string
	private channel:			string
	private webSocket: 			WebSocketSubject<any> 
	private	secondPartyPresent: boolean
	private baseTimeout:		number
	private iceCandidates:		Subject<any>			= new Subject()
	

	public	iceCandidate$:		Observable<any> 		= this.iceCandidates.asObservable()
	

	constructor(
		url			:string, 
		channel		:string,
		baseTimeout	:number = 10000
	){
		this.url 				= url
		this.channel 			= channel
		this.baseTimeout		= baseTimeout
		this.secondPartyPresent = false

		this.webSocket = webSocket(this.url)
		this.webSocket.asObservable().subscribe({
			next: message => {
				if(message.type == 'joined') 	this.secondPartyPresent = message.count && message.count > 1
				if(message.type == 'candidate')	this.iceCandidates.next(message.candidate)
			}
		})
	}




	//TODO allow for Cancel

	private async waitForMessage(callback: (any) => boolean, to): Promise<any>{
		return await 	this.webSocket.asObservable()
						.pipe(
							filter(callback),
							take(1),
							timeout(to),					//TODO allow for Cancel!
						)
						.toPromise()
	}





	public async join(timeout = this.baseTimeout): Promise<any>{
		let success	= 	this.waitForMessage(  
							message =>		message.type 		== 'joined'
										&&	message.self 		== true
										&& 	message.channel 	== this.channel,
							timeout			//TODO
						)
	
		this.webSocket.next({type:'join', channel:this.channel})	

		return await success 		
	}

	public async waitForSecondParty(timeout = this.baseTimeout*10): Promise<any> {
		return	this.secondPartyPresent
				?	true
				:	await 	this.waitForMessage( 								
								message => message.type == 'joined' && (message.count>1), 
								timeout
							)
	}

	public async waitForOffer(timeout = this.baseTimeout): Promise<any> {
		return 	await	this.waitForMessage( 
							message => message.type == 'offer' && message.offer, 
							timeout
						)
						.then( message => message.offer )
	}

	public async sendOffer(offer): Promise<any> {
		return this.webSocket.next({type: 'offer', offer})
	}


	public async waitForOfferReceipt(timeout = this.baseTimeout):Promise<any> {
		return await 	this.waitForMessage( 
							message => message.type == 'receipt' && message.receipt == 'offer',
							timeout
						)
	}

	public async confirmOfferReceipt(): Promise<any> {
		return this.webSocket.next({type: 'receipt', receipt:'offer'})
	}

	public async waitForAnswer(timeout = this.baseTimeout): Promise<any> {
		return await	this.waitForMessage( 
							message => message.type == 'answer' && message.answer,
							timeout
						)
						.then( message => message.answer)
	}

	public async sendAnswer(answer):Promise<any> {
		return this.webSocket.next({type: 'answer', answer})
	}

	public async waitForAnswerReceipt(timeout = this.baseTimeout):Promise<any> {
		return await 	this.waitForMessage( 
							message => message.type == 'receipt' && message.receipt == 'answer',
							timeout
						)
	}

	public async confirmAnswerReceipt(): Promise<any> {
		return this.webSocket.next({type: 'receipt', receipt:'answer'})
	}

	public async sendCandidate(candidate):Promise<any> {
		return this.webSocket.next({type: 'candidate', candidate})
	}

	public async close(){
		return this.webSocket.unsubscribe()
	}
	

}