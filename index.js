const server = require("./server");

let port = process.env.PORT || 4000;

server.listen(port, () => {
	console.log("\n Running on port 4k or dynamic \n");
});
