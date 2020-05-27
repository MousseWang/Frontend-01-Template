<!--
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-04-15 00:55:59
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-27 23:41:55
--> 
# CSS


## @ Rules

* @charset
* @import
* @page
* @media
* @document
* @supports
* @font-face
* @keyframes
* @viewport
* @counter-style

#### 其中 @charset，@import，@page，@media比较常用

### @charset
#### @charset字符编码方式

```
@charset "utf-8";
```

### @import
#### @import 引入外部CSS文件

```
@import "./xxx.css";
```


### @page
#### 对页面的整体设置


### @media
#### 媒体查询。可以指定不同屏幕分辨率下的样式

### @support
#### @support可以查询运行环境的兼容性
```
@supports (display: grid) {
  div {
    display: grid;
  }
}
@supports not (display: grid) {
  div {
    float: right;
  }
}
```

## rules

###  选择器

#### id, class, attr

####  >  ,  +  ~  space 

### 变量

#### css中可以通过 -- 来声明，使用变量

```
:root { --main-color: #06c; --accent-color: #006;}
#foo h1 { color: var(--main-color);}
```

### 函数

* calc()
* max()
* min()
* clamp()
* toggle()
* attr()