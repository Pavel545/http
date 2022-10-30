const http = require("http");
const { url } = require("inspector");
const { URL } = require("url");
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
  let url2 = new URL(`http://${hostname}:${port}` + req.url);
  console.log(url2);
  console.log(url2.search);
  if (url2.search.startsWith("?hello")) {
    const name = url2.searchParams.get("hello");
    if (name) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end(`Hello, ${name}\n`);

      return;
    }
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Enter a name\n");
    return;
  }

  if (req.url === "/") {
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
