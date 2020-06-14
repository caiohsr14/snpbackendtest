module.exports = class NotFoundError extends Error {
	constructor(resourceName) {
		super();
		this.message = resourceName + " not found.";
	}
};
