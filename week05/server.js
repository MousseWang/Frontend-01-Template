/*
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-05-09 19:34:47
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-09 20:17:40
 */
const http = require('http');

const server = http.createServer((req,res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write('200', 'Content-Type', 'text/plain')
  res.end('ok')
})

server.listen(8025)