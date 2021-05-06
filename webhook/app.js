const http = require('http');

const host = "http://localhost"
const port = 3001;

// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
http.createServer((request, response) => {
  
  const { headers, method, url } = request;
  console.log(url, headers)

  // let body = [];
  // request.on('error', (err) => {
  //   console.error(err);
  // }).on('data', (chunk) => {
  //   body.push(chunk);
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString();
  //   // At this point, we have the headers, method, url and body, and can now
  //   // do whatever we need to in order to respond to this request.
  //   console.log(body);
  // });

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end('{"X-Hasura-User-Id":"1","X-Hasura-Role":"admin"}');

}).listen(port, () => console.log(`${host}:${port}`));
