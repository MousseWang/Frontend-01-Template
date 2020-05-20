<!--
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-04-15 00:55:59
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-20 23:01:43
--> 
# HTTP
## Request
```
  // Resquestline 
  POST / HTTP/1.1
  // Headers
  Host: '127.0.0.1'
  Port: '80'
  Content-Type: 'application/x-www-form-urlencoded'
  Content-length: 1
  // body
  xx=xxx
  ...
```
### Resquestline 
#### Method
* GET
* POST
* OPTIONS
*  HEAD
*  PUT
*  DELETE
*  TRACE
*  CONNECT
#### Path
#### HTTP Version
#### Header
#### Host
#### Port
#### Content-Type
#### Content-length
#### Response
```
// Status line 
HTTP/1.1 200 OK 
// Headers
Content-Type: 'text/html'
Date: Sun, 17 May 2020 14:51:01 GMT
Transfer-Encoding: chunked
// body (chunked)
14
<html>1</html>

```

### Resquestline 
#### Method
• GET
• POST
• OPTIONS
• HEAD
• PUT
• DELETE
• TRACE
• CONNECT
#### Path
#### HTTP Version
#### Header
#### Host
#### Port
#### Content-Type
#### Content-length

# 状态机
## 有限状态机
#### 有限状态机每个状态都是一个机器。每个机器里都可以计算，存储，输出。状态机所有接受的状态都是一致的。
### Moore状态机
#### 每个机器都有确定的下一个状态
### Mealy状态机
### 每个状态机下一个状态由当前状态决定