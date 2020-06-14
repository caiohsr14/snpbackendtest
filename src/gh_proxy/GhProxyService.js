const NotFoundError = require("../errors/NotFoundError");
const RequestError = require("../errors/RequestError");
const ValidationError = require("../errors/ValidationError");
const got = require("got");

const prefixUrl = "https://api.github.com";

module.exports = class GhProxyService {
    async userList(req, since) {
        try {
            const response = await got("users", {
                searchParams: { since: since },
                responseType: "json",
                prefixUrl: prefixUrl,
            });

            const userList = response.body;
            var next = req.protocol + "://" + req.get("host") + req.path;

            if (Array.isArray(userList) && userList.length) {
                next += "?since=" + userList[userList.length - 1].id;
            }

            return { next: next, userList: response.body };
        } catch (err) {
            throw new RequestError(err);
        }
    }

    async userDetails(username) {
        if (!username || username === "{username}") {
            throw new ValidationError({ username: "required" });
        }

        if (typeof username !== "string") {
            throw new ValidationError({ username: "must be a string" });
        }

        try {
            const body = await got("users/" + username, {
                responseType: "json",
                resolveBodyOnly: true,
                prefixUrl: prefixUrl,
            });

            return body;
        } catch (err) {
            if (err.response.statusCode === 404) {
                throw new NotFoundError("User");
            }

            throw new RequestError(err);
        }
    }

    async userRepos(username) {
        if (!username || username === "{username}") {
            throw new ValidationError({ username: "required" });
        }

        if (typeof username !== "string") {
            throw new ValidationError({ username: "must be a string" });
        }

        try {
            const body = await got("users/" + username + "/repos", {
                responseType: "json",
                resolveBodyOnly: true,
                prefixUrl: prefixUrl,
            });

            return body;
        } catch (err) {
            if (err.response.statusCode === 404) {
                throw new NotFoundError("User");
            }

            throw new RequestError(err);
        }
    }
};
