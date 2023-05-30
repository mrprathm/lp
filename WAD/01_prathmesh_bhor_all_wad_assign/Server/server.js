const http = require("http");

const hostname = "127.0.0.1"; // The server will listen on localhost
const port = 3000; // Use any available port number

const server = http.createServer((req, res) => {
  res.statusCode = 200; // Set the response status code
  res.setHeader("Content-Type", "text/plain"); // Set the response content type
  res.end("Hello, World!\n"); // Set the response content
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
