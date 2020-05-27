/*
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-05-17 17:01:49
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-24 12:45:27
 */ 
const parser = require('./parser');
const net = require('net');

class Request{
  constructor(options){
    this.method = options.method || 'GET';
    this.host = options.host;
    this.port = options.port || '8080';
    this.path = options.path || '/';
    this.headers = options.headers || {};
    this.body = options.body;
    if(!this.headers['Content-type']){
      this.headers['Content-type'] = 'application/x-www-form-urlencoded'
    }

    if(this.headers['Content-type'] === 'application/json'){
      this.bodyText = JSON.stringify(this.body)
    }else if(this.headers['Content-type'] === 'application/x-www-form-urlencoded'){
      this.bodyText = Object.keys(this.body).map(item => `${item}=${this.body[item]}`).join('&')
    }
    this.headers['Content-length'] = this.bodyText.length;
  }

  toString(){
    return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(item => `${item}:${this.headers[item]}`).join('\r\n')}
\r
${this.bodyText}`
  }

  send(connection){
    const parser = new ResponseParser();
    return new Promise((resolve, reject) => {
      if(connection){
        connection.write(this.toString())
      }else{
        connection = net.createConnection({
            host: this.host,
            port: this.port
          }, () => {
            connection.write(this.toString())
        })
      }
  
      connection.on('data', data => {
        console.log('ondata')
        parser.receive(data.toString())
        if(parser.trunkedBodyParserFinish){
          resolve(parser.response)
        }
        connection.end()
      })
  
      connection.on('error', err => {
        console.log('error')
        reject(err)
      })
  
      connection.on('end', () => {
        console.log('end')
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
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_STATUS_BODY =7;

    this.curr = this.WAITING_STATUS_LINE;
    this.statusLine = '';
    this.headers = {};
    this.headerName = '';
    this.headerValue = '';
    this.bodyParser = null; 
  }

  get trunkedBodyParserFinish(){
    return this.bodyParser && (this.bodyParser.curr === this.bodyParser.WAITING_BODY_END)
  }

  get response(){
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText: RegExp.$2,
      headers: this.headers,
      body: this.bodyParser.content.join('')
    }
  }

  receive(string){
    for(let i = 0; i < string.length; i++){
      this.receiveChar(string.charAt(i))
    }
  }

  receiveChar(char){
    if(this.curr === this.WAITING_STATUS_LINE){
      if(char === '\r'){
        this.curr = this.WAITING_STATUS_LINE_END;
      }else{
        this.statusLine += char;
      }
    }else if(this.curr === this.WAITING_STATUS_LINE_END){
      if(char === '\n'){
        this.curr = this.WAITING_HEADER_NAME;
      }
    }else if(this.curr === this.WAITING_HEADER_NAME){
      if(char === ':'){
        this.curr = this.WAITING_HEADER_SPACE;
      }else if(char === '\r'){
        this.curr = this.WAITING_HEADER_BLOCK_END;
        if(this.headers['Transfer-Encoding'] === 'chunked')
          this.bodyParser = new TrunkedBodyParser()
      }else{
        this.headerName += char
      }
    }else if(this.curr === this.WAITING_HEADER_SPACE){
      if(char === ' '){
        this.curr = this.WAITING_HEADER_VALUE
      } 
    }else if(this.curr === this.WAITING_HEADER_VALUE){
      if(char === '\r'){
        this.curr = this.WAITING_HEADER_LINE_END;
      }else{
        this.headerValue += char;
      }
    }else if(this.curr === this.WAITING_HEADER_LINE_END){
      this.curr = this.WAITING_HEADER_NAME;
      this.headers[this.headerName] = this.headerValue;
      this.headerName = '';
      this.headerValue = '';
    }else if(this.curr === this.WAITING_HEADER_BLOCK_END){
      if(char === '\n'){
        this.curr = this.WAITING_STATUS_BODY;
      }
    }else if(this.curr === this.WAITING_STATUS_BODY){
      this.bodyParser.receiveChar(char)
    }
  }
  
}

class TrunkedBodyParser{
  constructor(){
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE = 3;
    this.WAITING_NEW_LINE_END = 4;
    this.WAITING_BODY_END = 5;

    this.curr = this.WAITING_LENGTH;
    this.length = 0;
    this.content = [];
  }

  receiveChar(char){
    if(this.curr === this.WAITING_LENGTH){
      if(char === '\r'){
        this.curr = this.WAITING_LENGTH_END;
        if(this.length === 0){
          this.curr = this.WAITING_BODY_END
        }
      }else{
        this.length *= 16;
        this.length += parseInt(char,16);
      }
    }else if(this.curr === this.WAITING_LENGTH_END){
      if(char === '\n'){
        this.curr = this.READING_TRUNK;
      }
    }else if(this.curr === this.READING_TRUNK){
      // if(char === '\n'){
      //   this.curr = this.WAITING_LENGTH_END;
      // }
      // else{
        this.content.push(char)
        this.length --;
        if(this.length === 0){
          this.curr = this.WAITING_NEW_LINE;
        }
      // }
      
    }else if(this.curr === this.WAITING_NEW_LINE){
      if(char === '\r'){
        this.curr = this.WAITING_NEW_LINE_END;
      }
    }else if(this.curr === this.WAITING_NEW_LINE_END){
      if(char === '\n'){
        this.curr = this.WAITING_LENGTH;
      }
    }
  }

}

void async function(){

  const client = new Request({
    method: 'GET',
    host: '127.0.0.1',
    port:'8025',
    path: '/',
    headers: {
      ['nameself']: 'halva'
    },
    body: {
      name: 'Halva Wang'
    }
  })

  const res = await client.send();
  parser.parseHTML(res.body)
}();