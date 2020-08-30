const http =  require('http');
const querystring = require('querystring');
const fs = require('fs');
const child_process = require('child_process');
const archiver = require('archiver')

child_process.exec(`open https://github.com/login/oauth/authorize?client_id=Iv1.32bc666595fd41cc&redirect_uri=http%3A%2F%2Flocalhost%3A3002%2Fauth&scope=read%3Auser&state=halva123`)

const server = http.createServer((res, request) => {
  let token = request.url.match(/token=([^&]+)/)[1]
  const packname = './package'

  const option = {
    host: '127.0.0.1',
    port: 3002,
    path: '/?filename=package.zip',
    method: 'post',
    headers: {
      'Content-Type': 'application/octet-stream',
      token
    }
  }

  const req = http.request(option)

  let archive = archiver('zip', {
    zlib: { level: 9 }
  })

  archive.directory(packname, false);

  archive.pipe(fs.createWriteStream('./package.zip'));

  archive.finalize();

  archive.pipe(req)

  archive.on('end', () => {
    req.end();
    // const redirect_uri = encodeURIComponent("http://localhost:3002/auth")
  })
});

server.listen(3000)