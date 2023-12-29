const http = require("http");
const url = require("url");
let count = 0;

const server = http.createServer((req, res) => {
  const path = url.parse(req.url, true).pathname;
  res.setHeader("Content-Type", "text/plain; charset=utf-8");

  if(path in urlMap) {
    urlMap[path](req, res);
  }else {
    notFound(req, res);
  }
})
.listen(3000, () => console.log("라우터를 만들어보자"));

function log(count) {
  console.log((count += 1));
}

const user = (req, res) => {
  const userInfo = url.parse(req.url, true).query;

  res.end(`[user] name : ${userInfo.name}, age: ${userInfo.age}`);
};

const feed = (req, res) => {
  res.end(`<ul>
  <li>picture1</li>
  <li>picture2</li>
  <li>picture3</li>
  </ul>`);
}

const notFound = (req, res) => {
  res.statusCode = 404;
  res.end("404 page not found");
}

const urlMap = {
  "/": (req, res) => res.end("HOME"),
  "/user" : user,
  "/feed" : feed
}