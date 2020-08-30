const http = require('http');
const https = require('https');
const unzip = require('unzipper');

function auth(req, res){
  let client_id = 'Iv1.32bc666595fd41cc';
  let client_secret = '06fae10f20d14d515e1420c9bdbf4d4c804ce8d1';
  let code = req.url.match(/code=([^&]+)/)[1];
  let redirect_uri = 'http%3A%2F%2Flocalhost%3A3002%2Fauth';
  let state = 'halva123';

  const params = `client_id=${client_id}&&client_secret=${client_secret}&&code=${code}&&redirect_uri=${redirect_uri}&&state=${state}`


  const options = {
    hostname: 'github.com',
    port: 443,
    path: `/login/oauth/access_token?${params}`,
    method: 'POST'
  };
  
  const request = https.request(options, (res1) => {
    console.log('statusCode:', res1.statusCode);
    console.log('headers:', res1.headers);
  
    res1.on('data', (d) => {
      const reuslt = d.toString().match(/access_token=([^&]+)/)
      if(reuslt){
        const token = reuslt[1];
        res.writeHead(200, {
          'access_token': token,
          'Content-Type': 'text/html'
        })
        res.end(`<a href="http://localhost:3002/publish?token=${token}">publish</a>`);
      }else{
        res.writeHead(200, {
          'Content-Type': 'text/plain',
        });
        res.end('error');
      }
    });
  });
  
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();
}

const server = http.createServer((req, res) => {
  if(req.url.match(/^\/auth/)){
    return auth(req, res)
  }

  if (req.url.match(/^\/favicon.ico/)) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not Found');
    return;
  }

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/user',
    method: 'GET',
    headers: {
      Authorization: `token ${req.headers.token}`,
      'User-Agent': 'toy-publish',
    },
  };
  console.log('options ' + options);

  const request = https.request(options, (response) => {
    let body = '';
    response.on('data', (d) => {
      if (d) {
        body += d.toString();
      }
    });

    response.on('end', () => {
      let user = JSON.parse(body);
      console.log(user)
      let writeStream = unzip.Extract({ path: '../server/public' })
      req.pipe(writeStream);
      req.on('end', () => {
        res.writeHead(200, { 'Content-Type': 'text/plain'});
        res.end('okay')
      })
    });
  });
  request.on('error', (e) => {
    console.error(e);
  });
  request.end();

})

server.listen(3002)