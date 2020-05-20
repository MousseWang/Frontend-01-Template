/*
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-05-09 19:34:47
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-20 02:09:47
 */
const http = require('http');

const server = http.createServer((req,res) => {
  console.log('service req')
  console.log(req.headers)
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar')
  res.writeHeader(200, {'Content-Type': 'text/plain'})
  console.log('service res')
  res.end(
`<html>
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
        <img />
        <img />
    </div>
</body>
</html>
`)
})

server.listen(8025)