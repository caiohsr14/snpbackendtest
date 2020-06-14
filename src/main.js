const server = require("./server")

const PORT = process.env.PORT || 3000;

main();

async function main() {
    server.listen(PORT, (err) => {
        if (err) {
            throw err;
        }
        // eslint-disable-next-line no-console
        console.log(`api-server listening on port ${PORT}`);
    });
}
