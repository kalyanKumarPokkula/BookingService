const { StatusCodes } = require('http-status-codes');

class ServiceError extends Error{
    constructor(
        message = 'Something Went Wrong', 
        explanation = 'Service layer error', 
        statuscodes = StatusCodes.INTERNAL_SERVER_ERROR
        ){
            super()
            this.name = 'ServiceError',
            this.message = message,
            this.explanation = explanation,
            this.statuscodes = statuscodes
        }
}

module.exports = ServiceError;