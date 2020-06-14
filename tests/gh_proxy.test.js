const request = require("supertest");
const server = require("../src/server");

describe("GET /users", function () {
	it("responds with json", function (done) {
		request(server)
			.get("/users")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});

	it("has 30 users in the first page of users and a link to the next page", function (done) {
		request(server)
			.get("/users?since=1")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.expect((response) => {
				expect(response.body.userList).toHaveLength(30);
				expect(response.body).toHaveProperty("next");
				expect(response.body.next).toContain("since");
			})
			.end(done);
	});

	it("responds with empty list of users for a starting id higher than the available ones", function (done) {
		request(server)
			.get("/users?since=100000000")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.expect((response) => {
				expect(response.body.userList).toHaveLength(0);
			})
			.end(done);
	});
});

describe("GET /users/:username/details", function () {
	it("responds with json for an example user", function (done) {
		request(server)
			.get("/users/caiohsr14/details")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});

	it("responds with not found for an invalid example user", function (done) {
		request(server)
			.get("/users/caiohsr141231/details")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});

	it("responds with bad request for an invalid username parameter", function (done) {
		request(server).get("/users/{username}/details").expect(400, done);
	});

	it("has id and login fields for an example user", function (done) {
		request(server)
			.get("/users/caiohsr14/details")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.expect((response) => {
				expect(response.body).toHaveProperty("details");
				expect(response.body.details).toHaveProperty("id");
				expect(response.body.details).toHaveProperty("name");
			})
			.end(done);
	});
});

describe("GET /users/:username/repos", function () {
	it("responds with json for an example user", function (done) {
		request(server)
			.get("/users/caiohsr14/repos")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200, done);
	});

	it("responds with not found for an invalid example user", function (done) {
		request(server)
			.get("/users/caiohsr141231/repos")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(404, done);
	});

	it("responds with bad request for an invalid username parameter", function (done) {
		request(server).get("/users/{username}/repos").expect(400, done);
	});

	it("has at least one repo for a known example user with id and name fields", function (done) {
		request(server)
			.get("/users/caiohsr14/repos")
			.set("Accept", "application/json")
			.expect("Content-Type", /json/)
			.expect(200)
			.expect((response) => {
				expect(response.body).toHaveProperty("repos");
				expect(response.body.repos.length).toBeGreaterThanOrEqual(1);
				expect(response.body.repos[0]).toHaveProperty("id");
				expect(response.body.repos[0]).toHaveProperty("name");
			})
			.end(done);
	});
});
