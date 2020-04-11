import	{	
			Injectable,
			InjectionToken
		}							from '@angular/core'
import	{	
			Observable, 
			Subject
		}							from 'rxjs'


import	{	RccConnection }			from './rcc-connection.class'
import	{	SignalingService }		from './signaling-service.class'
import	{	WebRTCService }			from './webrtc-service.class'


export interface RccConnectionConfig{
	stunServers: 	string[],
}

export const RccConnectionConfigToken = new InjectionToken<string>('RccConnectionConfig')




@Injectable({
	providedIn: 'root'
})
export class RccConnectionService {

	static forRoot(){}

	constructor() {}
		
	
	public connect(channel:string, secret:string): RccConnection {		
		return 	new RccConnection(
					secret, 
					new SignalingService('wss://signal.recoverycat.de', channel),  //ws://78.46.180.128:9090
					new WebRTCService({urls:"stun:stun.l.google.com:19302"})
				)		
	}


}