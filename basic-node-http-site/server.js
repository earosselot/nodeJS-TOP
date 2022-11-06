const http = require("http");
const path = require("path");
const fs = require("fs/promises");

require("dotenv").config();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const server = http.createServer(async (req, res) => {
  let fileName = fileNameForRoute(req);
  const data = await fs.readFile(fileName);
  res.statusCode = 200;
  res.setHeader("Content-Type", "html");
  res.end(data);
});

server.listen(port, hostname, () => {
  console.log(`server running at http://${hostname}:${port}`);
});

function fileNameForRoute(req) {
  let fileName;
  if (req.url === "/") {
    fileName = "index.html";
  } else if (req.url === "/about") {
    fileName = "about.html";
  } else if (req.url === "/contact-me") {
    fileName = "contact-me.html";
  } else {
    fileName = "404.html";
  }
  return fileName;
}
