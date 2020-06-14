module.exports = class RequestError extends Error {
	constructor(err) {
		super();
		this.message = err.message;
		this.statusCode = err.response.statusCode;
	}
};
