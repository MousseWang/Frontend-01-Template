

## 表达式

### 运算符

#### Member

* 成员访问：'.' / []

* super. / super[]

* new foo() 优先执行

* new.target 判断是否由new运算符调用

* foo``

#### new foo
> pdf 201

#### call

#### 单目运算符


## 语句

### Completion Record 完成语句

#### [[type]]: normal,break,continue,return, throw 

==若存在非normal语句，则暂停执行==

#### [[value]]: Types

#### [[target]]: label


### 简单语句

#### 表达式语句  `a = 1 + 2`;
#### 空语句 `;`
#### debugger语句 `debugger;`
#### throw语句 `throw a;`
#### 空语句 `;`
#### 空语句 `;`
#### 空语句 `;`

### 组合语句
#### block语句
```
  {
    somecode
  }
```

[[type]]: normal

[[value]]: -

[[target]]: -

#### 循环语句

* while

* do...while

* for 
for循环中let使用拆解
```
  {
    // for循环条件作用域
    let i = 0 
    {
      // 循环体作用域
      let i = 1;
      console.log(i)
    }
    console.log(i)
  }
```

* for...in
遍历对象的key

* for...of 
可以访问任何可遍历的数据：generator，array

#### try语句

```
  try{
    throw
  }catch(e){

  }finaly
```

[[type]]: normal

[[value]]: -

[[target]]: -



### 声明

#### 函数声明

```
  function foo(){

  }
```

#### generator声明

```
  function* foo(){
    yield 1;
    yield 2;
  }

  foo.next()
```

#### var声明

1. var不建议写在任何子结构里。写在函数的最前面
2. 不要在任何block中写var