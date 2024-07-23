class ExpressError extends Error {
    constructor(message, statusCode) {
        super(); // As we know, it will call the error constructor
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;