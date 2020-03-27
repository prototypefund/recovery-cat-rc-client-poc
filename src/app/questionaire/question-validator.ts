import	{	QuestionConfig }		from './question-config.interface'



interface QuestionValidatorFn {
	(any, QuestionConfig): Promise<object|null>
}


class QuestionValidatorClass{

	private	validators:QuestionValidatorFn[] = []

	public register(validator: QuestionValidatorFn):this
	public register(validators: QuestionValidatorFn[]):this
	public register(x: QuestionValidatorFn|QuestionValidatorFn[]):this { 
		Array.isArray(x)
		?	this.validators.push(...x)
		:	this.validators.push(x)

		return this
	}

	validateAnswer(value:any, config: QuestionConfig): Promise<object|null> {
		return 	Promise.all(this.validators.map( validator => validator(value, config) ))
				.then( () => null )
	}
}


class QuestionValidationError{
	public questionTypeConstraints:object = {}

	constructor(message: string, value:any, config: QuestionConfig){
		this.questionTypeConstraints = { message, value, config}
	}
}



let QuestionValidator = new QuestionValidatorClass()

export { QuestionValidator, QuestionValidatorFn, QuestionValidationError }







// validators for type = 'string':

async function stringCheckType(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'string') 	return null
	if(typeof value != 'string')	throw new QuestionValidationError('NOT_A_STRING', value, config)

	return null
}

async function stringCheckOptions(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'string') 	return null
	if(config.options == undefined)	return null
	if(!config.options.map( option => option.value).includes(value) ) throw new QuestionValidationError('NOT_AN_OPTION', value, config)

	return null
}




// validators for type = 'integer':

async function integerCheckType(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'integer') 	return null
	if(!Number.isInteger(value)) 	throw new QuestionValidationError('NOT_AN_INTEGER', value, config)

	return null
}

async function integerCheckBounds(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'integer') 	return null
	if(config.min != undefined && value < config.min) throw new QuestionValidationError('TOO_SMALL', value, config)
	if(config.max != undefined && value > config.max) throw new QuestionValidationError('TOO_LARGE', value, config)

	return null
}

async function integerCheckOptions(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'integer') 	return null
	if(config.options == undefined)	return null
	if(!config.options.map( option => option.value).includes(value) ) throw new QuestionValidationError('NOT_AN_OPTION', value, config)

	return null
}





// validators for type = 'float':

async function floatCheckType(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'float') 		return null
	if(typeof value != 'number')	throw new QuestionValidationError('NOT_A_FLOAT', value, config)

	return null
}

async function floatCheckBounds(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'float') 	return null
	if(config.min != undefined && value < config.min) throw new QuestionValidationError('TOO_SMALL', value, config)
	if(config.max != undefined && value > config.max) throw new QuestionValidationError('TOO_LARGE', value, config)

	return null
}

async function floatCheckOptions(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'float') 	return null
	if(config.options == undefined)	return null
	if(!config.options.map( option => option.value).includes(value) ) throw new QuestionValidationError('NOT_AN_OPTION', value, config)

	return null
}


// validators for type = 'boolean':

async function booleanCheckType(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'boolean') 	return null
	if(typeof value != 'boolean')	throw new QuestionValidationError('NOT_A_BOOLEAN', value, config)
}




// validators for type = 'unknown':

async function unknownCheck(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != 'unknown') 		return null

	throw new QuestionValidationError('TYPE_UNKNOWN', value, config)
}




// validators for type = undefined:

async function undefinedCheck(value:any, config:QuestionConfig):Promise<object|null>{ 
	if(config.type != undefined) 		return null

	throw new QuestionValidationError('TYPE_UNDEFINED', value, config)
}



QuestionValidator.register([
	stringCheckType,
	stringCheckOptions,
	integerCheckType,
	integerCheckBounds,
	integerCheckOptions,
	floatCheckType,
	floatCheckBounds,
	floatCheckOptions,
	booleanCheckType,
	unknownCheck,
	undefinedCheck
])