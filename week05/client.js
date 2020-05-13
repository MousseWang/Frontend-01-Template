/*
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-05-09 19:48:56
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-10 13:07:45
 */
const net = require('net')


class Request{
  // method, url = host + port + path
  // body: k:v
  // headers

  constructor(options){
    this.method = options.method || 'GET';
    this.host = options.host;
    this.path = options.path || '/';
    this.port = options.port || '80';
    this.body = options.body || {};
    this.headers = options.headers || {}
    
    if(!this.headers["Content-Type"]){
      this.headers["Content-Type"] = 'application/x-www-form-urlencoded'
    }

    if(this.headers["Content-Type"] === 'application/json'){
      this.bodyText = JSON.stringify(this.body)
    }else if(this.headers["Content-Type"] = 'application/x-www-form-urlencoded'){
      this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&')
    }
    this.headers['Content-Length'] = this.bodyText.length;
  }

  toString(){
    return `${this.method} ${this.path} HTTP/1.1\r
Host: ${this.host}\r
Content-Type: ${this.headers[Content-Type]}\r
Content-Length: ${this.headers[Content-Length]}\r
\r
${this.bodyText}`
  }




  send(connection){
    return new Promise((resolve, reject) => {
      if(connection){
        connection.write(this.toString)
      }else{
        connection = net.createConnection({
          host: this.host,
          port: this.port
        },() => {
          connection.write(this.toString())
        })
      }
      connection.on('data', data => {
        resolve(data.toString())
        connection.end()
      })
      connection.on('error', err => {
        reject(err)
        connection.end()
      })
    })  
  }
}

class Response{
  
}

class ResponseParser{
  constructor(){
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_VALUE = 3;
    this.WAITING_HEADER_LINE_END = 4;
    this.WAITING_HEADER_BLOCK_END = 5;

    this.WAITING_HEADER_BLOCK_END = 5;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
  }

  receive(string){
    for(let i = o; i < string.length; i++){
      this.receiveChar(string.charAt(i))
    }
  }

  receiveChar(char){
    switch(this.current){
      case WAITING_STATUS_LINE:
        this.statusLine += char
        break;
    }
  }
}

class TrunkedBodyParser{
  constructor(){
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_VALUE = 3;
    this.WAITING_HEADER_LINE_END = 4;
    this.WAITING_HEADER_BLOCK_END = 5;
  }

  receive(string){

  }
}

void async function(){
  let request = new Request({
    method: 'POST',
    host: '127.0.0.1',
    port: '8025',
    path: '/',
    body:{
      name: 'halva'
    }
  })

  await request.send()
}

// const client = net.connect({
//   host: '127.0.0.1',
//   port: 8025,
// }, () => {

//   client.write(`
// GET / HTTP/1.1\r
// Host: 127.0.0.1\r
// Content-Type: application/x-www-form-urlencoded\r
// Content-Length: 9\r
// \r
// field=xxx`);
// })



// client.on('end', data => {
//   console.log('end')
// })