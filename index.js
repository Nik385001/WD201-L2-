const fs = require("fs");
const http = require("http");
const readline = require("minimist");

const args = require("minimist")(process.argv.slice(2));
let port = args.port;

// create objects to store the information
let homeContent = "";
let projectContent = "";
let registrationContent = "";
let styleContent = "";
let scriptContent = "";

// read the files from the local folders
fs.readFile("./home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});
fs.readFile("./project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});
fs.readFile("./registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  registrationContent = registration;
});
fs.readFile("./script.js", (err, script) => {
  if (err) {
    throw err;
  }
  scriptContent = script;
});
fs.readFile("./style.css", (err, style) => {
  if (err) {
    throw err;
  }
  styleContent = style;
});

// use the HTTP server to rander the above content in a port of our choice...
// fs.readFile("home.html", (err, home) => {
//     if (err) {
//         throw err;
//       }
const server = http.createServer((req, res) => {
  let url = req.url;
  res.writeHead(200, { "Content-Type": "text/html" });
  switch (url) {
    case "/project":
      res.write(projectContent);
      res.end();
      break;

    case "/registration":
      res.write(registrationContent);
      res.end();
      break;

    case "/style.css":
      res.writeHead(200, { "Content-Type": "text/css" });
      res.write(styleContent);
      res.end();
      break;

    case "/script.js":
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(scriptContent);
      res.end();
      break;

    default:
      res.write(homeContent);
      res.end();
      break;
  }
});
server.listen(port, "127.0.0.1", () => {
  console.log(`listening at port ${port}`);
});
