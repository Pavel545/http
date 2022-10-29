const http = require("http");
const { url } = require("inspector");
const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;
const server = http.createServer((req, res) => {
  if (req.url === "/?users") {
    res.statusCode = 200;
    res.statusMessage = "ok";
    res.setHeader("Content-Type", "application/json");
    res.write(getUsers());
    res.end("");

    return;
  }
  if (req.url === "/?hello=<name>") {
    res.statusCode = 200;
    res.statusMessage = "ok";
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello," + req.url+"\n");

    return;
  }
  if ((req.url === "/?hello")|| (req.url === "/?hello=")) {
    res.statusCode = 400;
    res.statusMessage = "ok";
    res.setHeader("Content-Type", "application/json");
    res.end("Enter a name\n");

    return;
  }
  if (req.url==="/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World\n");
  return;

  }
  res.statusCode = 500;
  res.end("\n");

});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}/`);
});
