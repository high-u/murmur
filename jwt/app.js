const http = require('http');
var jwt = require('jsonwebtoken');

const host = "http://localhost"
const port = 3001;

// https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
http.createServer((request, response) => {
  
  const { headers, method, url } = request;
  console.log(url, headers)

  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    console.log(body);
  });

  const claim = {
    "exp": Math.floor(new Date().getTime() / 1000) + (60 * 60 * 12),
    "sub": "1234567890",
    "name": "John Doe",
    "admin": true,
    "iat": Math.floor(new Date().getTime() / 1000),
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": ["editor","user", "mod"],
      "x-hasura-default-role": "user",
      "x-hasura-user-id": "1234567890",
      // "x-hasura-org-id": "123",
      // "x-hasura-custom": "custom-value"
    }
  }
  var token = jwt.sign(claim, '3bd561c37d214b4496d09049fadc542c');
  // console.log(token)

  response.writeHead(200, {'Content-Type': 'application/json'});
  response.end(JSON.stringify({accessToken: token}));

}).listen(port, () => console.log(`${host}:${port}`));
