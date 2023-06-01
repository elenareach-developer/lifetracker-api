class ExpressError extends Error {
    constructor(message, status){
        super()
        this.message = message
        this.status = status
    }
}

class BadRequestError extends ExpressError{
    constructor (message = "Bad Request"){
        super(message, 400)
    }
}
class UnauthorisedError extends ExpressError{
    constructor (message = "Unauthorised"){
        super(message, 401)
    }
}
class ForbiddenError extends ExpressError{
    constructor (message = "Forbidden Request"){
        super(message, 403)
    }
}

class NotFoundError extends ExpressError{
    constructor (message = "Not Found"){
        super(message, 404)
    }
}

module.exports = {
    ForbiddenError,
    NotFoundError,
    UnauthorisedError,
    BadRequestError
}