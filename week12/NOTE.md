# JS 正则 API

<a name="AHHS7"></a>
## String.Match


<a name="vTO9G"></a>
#### String.match(/xx/) 返回一个对象，包括第一个匹配的xx字符串，index，input，groups(一个捕获组数组 或 undefined（如果没有定义命名捕获组）)


```javascript
'abc'.match(/abc/)

// ["abc", index: 0, input: "abc", groups: undefined]
```


<a name="DGrAy"></a>
#### String.match(/xx(foo)/)  返回第一个匹配的xx字符串，第一个匹配的foo字符串，index，input，groups
```javascript
'abcabc'.match(/(a)b(c)/)

// ["abc", "a", "c", index: 0, input: "abcabc", groups: undefined]
```
<a name="H6Sc3"></a>
#### String.match(/xx/g) 返回匹配的所有xx字符串， `（）` 匹配失效


```javascript
'abcabc'.match(/bc/g)

// ["bc", "bc"]

'abcabc'.match(/b(c)/g)

// ["bc", "bc"]
```


<a name="oleU1"></a>
## String.replace


<a name="7Zz3G"></a>
#### String.replace(/foo/, 'bar')


<a name="Jp1lc"></a>
#### String.replace(/foo(baz)/, '$1')
将foobaz替换为baz
```javascript
'abcbc'.replace(/a(b)/, '$1')

// "bcbc"
```
<br />
<a name="IRcI0"></a>
#### String.replace(/foo(baz)/, function(str, $1){
<a name="i44Oc"></a>
#### return xx
<a name="S9DVe"></a>
#### })


其中str为foobaz， $1为baz

```javascript
'abcbc'.replace(/a(b)/, function(str, $1){
    console.log(str)
    console.log($1)
})

// ab
// b

// "undefinedcbc"

'abcbc'.replace(/a(b)/, function(str, $1){
    return 1
})
// "1cbc"
```

<br />

<a name="JBOw6"></a>
## RegExp.exec

<br />Reg.exec(data)

| 对象 | 属性/索引 | 描述 | 例子 |
| :--- | :--- | :--- | :--- |
| `result` | `[0]` | 匹配的全部字符串 | `Quick Brown Fox Jumps` |
|  | `[1], ...[_n_ ]` | 括号中的分组捕获 | `[1] = Brown<br />[2] = Jumps` |
|  | `index` | 匹配到的字符位于原始字符串的基于0的索引值 | `4` |
|  | `input` | 原始字符串 | `The Quick Brown Fox Jumps Over The Lazy Dog` |
| `re` | `lastIndex` | 下一次匹配开始的位置 | `25` |
|  | `ignoreCase` | 是否使用了 "`i`" 标记使正则匹配忽略大小写 | `true` |
|  | `global` | 是否使用了 "`g`" 标记来进行全局的匹配. | `true` |
|  | `multiline` | 是否使用了 "`m`" 标记使正则工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。） | `false` |
|  | `source` | 正则匹配的字符串 | `quick\s(brown).+?(jumps)` |



```javascript
var regexp = /(function|new|return)|([ \t\n\r]+)|([a-zA-Z][a-zA-Z0-9]*)|([\(\)\{\}\;\,)])/g;
const source = `
    function foo(){
      return new Promise(resolve => {
        resolve
      })
    }
`
regexp.exec(source)
// ["↵    ", undefined, "↵    ", undefined, undefined, index: 0, input: "↵    function foo(){↵      return new Promise(resolve => {↵        resolve↵      })↵    }↵", groups: undefined]

regexp.exec(source)
// ["function", "function", undefined, undefined, undefined, index: 5, input: "↵    function foo(){↵      return new Promise(resolve => {↵        resolve↵      })↵    }↵", groups: undefined]
regexp.exec(source)
// [" ", undefined, " ", undefined, undefined, index: 13, input: "↵    function foo(){↵      return new Promise(resolve => {↵        resolve↵      })↵    }↵", groups: undefined]
regexp.exec(source)
// ["foo", undefined, undefined, "foo", undefined, index: 14, input: "↵    function foo(){↵      return new Promise(resolve => {↵        resolve↵      })↵    }↵", groups: undefined]
regexp.exec(source)
// ["(", undefined, undefined, undefined, "(", index: 17, input: "↵    function foo(){↵      return new Promise(resolve => {↵        resolve↵      })↵    }↵", groups: undefined]
regexp.exec(source)
// [")", undefined, undefined, undefined, ")", index: 18, input: "↵    function foo(){↵      return new Promise(resolve => {↵        resolve↵      })↵    }↵", groups: undefined]

...

```
