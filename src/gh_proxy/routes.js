const express = require("express");
const GhProxyService = require("./GhProxyService");
const router = express.Router();

/**
 * @swagger
 *
 * /users:
 *   get:
 *     description: Retrieve a list of users from GitHub since a last seen user id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: since
 *         description: Last seen user id from the users list.
 *         in: query
 *         type: integer
 *     responses:
 *       200:
 *         description: List of users and a ref to the next page of the list
 *       400:
 *         description: Not valid parameters and/or GitHub API unexpected error
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */
router.get("/users", function (req, res, next) {
    const ghProxyService = new GhProxyService();
    ghProxyService
        .userList(req, req.query.since ?? 0)
        .then((userList) => res.status(200).json(userList))
        .catch(next);
});

/**
 * @swagger
 *
 * /users/{username}/details:
 *   get:
 *     description: Retrieve an user details from GitHub
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username from a GitHub user.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User details
 *       400:
 *         description: Not valid parameters and/or GitHub API unexpected error
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */
router.get("/users/:username/details", function (req, res, next) {
    const ghProxyService = new GhProxyService();
    ghProxyService
        .userDetails(req.params.username)
        .then((details) => res.status(200).json({ details }))
        .catch(next);
});

/**
 * @swagger
 *
 * /users/{username}/repos:
 *   get:
 *     description: Retrieve an user public repositories from GitHub
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username from a GitHub user.
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User public repositories
 *       400:
 *         description: Not valid parameters and/or GitHub API unexpected error
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 *     tags:
 *       - Users
 */
router.get("/users/:username/repos", function (req, res, next) {
    const ghProxyService = new GhProxyService();
    ghProxyService
        .userRepos(req.params.username)
        .then((repos) => res.status(200).json({ repos }))
        .catch(next);
});

module.exports = router;
