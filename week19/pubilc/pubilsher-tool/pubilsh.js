const http =  require('http');
const querystring = require('querystring');
const fs = require('fs');
const archiver = require('archiver')

const packname = './package'

const option = {
  host: '127.0.0.1',
  port: 3002,
  path: '/?filename=package.zip',
  method: 'post',
  headers: {
    'Content-Type': 'application/octet-stream'
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
  req.end()
})