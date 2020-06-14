const express = require("express");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");
const NotFoundError = require("./errors/NotFoundError");
const RequestError = require("./errors/RequestError");
const ValidationError = require("./errors/ValidationError");

const PORT = process.env.PORT || 3000;

main();

async function main() {
    const app = express();
    const swaggerUi = require("swagger-ui-express");
    const swaggerJSDoc = require("swagger-jsdoc");

    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "GitHub API Proxy Application",
                version: "1.0.0",
            },
        },
        apis: ["./src/gh_proxy/routes.js"],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use(bodyParser.json());

    app.get("/", function (req, res) {
        res.redirect(307, "/api-docs");
    });

    app.use(require("./gh_proxy/routes"));

    app.use(function handleErrors(err, req, res, next) {
        if (err instanceof NotFoundError) {
            return res.status(404).json({ error: err });
        }

        if (err instanceof RequestError) {
            return res.status(400).json({ error: err });
        }

        if (err instanceof ValidationError) {
            return res.status(400).json({ error: err });
        }

        next(err);
    });

    app.listen(PORT, (err) => {
        if (err) {
            throw err;
        }
        // eslint-disable-next-line no-console
        console.log(`api-server listening on port ${PORT}`);
    });
}
