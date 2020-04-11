import	{	Injectable }		from '@angular/core'
import	{	Observable }		from 'rxjs'


@Injectable({
	providedIn: 'root'
})
export class Storage{

	private db

	public 	ready

	constructor() { 
		this.ready = this.setupIndexedDB()
	}

	private async setupIndexedDB(){
		let request = indexedDB.open("RecoveryCat Database")
		let promise = new Promise(r => request.onsuccess = r)

		request.onerror 		= e 	=> { throw e }
		request.onupgradeneeded = this.upgrade
		
		return await promise.then(event	=> { this.db = request.result })	
	}


	private upgrade(event){
		let db = event.target.result
    	let objectStore_1 = db.createObjectStore("reports")	
    	let objectStore_2 = db.createObjectStore("reportingSchedules")
    	let objectStore_3 = db.createObjectStore("questions")
	}

	public async store(storeName:string, data:any){

		await this.ready

		let transaction = this.db.transaction([storeName], "readwrite")
		let promise 	= new Promise( (s, j) => { transaction.oncomplete = s; transaction.onerror = j})

		transaction
		.objectStore(storeName)
		.put(data,1)

		return await promise
	}

	public async read(storeName:String){
		await this.ready 

		let transaction = this.db.transaction([storeName])
		let promise 	= new Promise( (s, j) => { transaction.oncomplete = s; transaction.onerror = j})

		let request 	= transaction.objectStore(storeName).get(1)

		return await promise.then( () => request.result)
	}

}