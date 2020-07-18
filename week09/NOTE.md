## CSS动画

### 定义

CSS动画通过@keyframes来定义，可以指定关键帧。动画会以关键帧为周期渲染

```
  // from to

  @keyframs animationName {
    from { background: #ffffff }
    to{ background: #000000 }
  }

  // percent

  @keyframs animationName {
    0 { background: #000000 }
    20% { background: #111111 }
    40% { background: #222222 }
    60% { background: #333333 }
    80% { background: #444444 }
    100% { background: #555555 }
  }

```

### 贝塞尔曲线

transition-timing-function 动画时间曲线，通常使用贝塞尔曲线

## 颜色

### 颜色定义规则

* CMYK
* RGB
* HLS
* HSV

## HTML

### HTML中必须转译的字符

* quot
* amp
* qt
* lt

### 语义

#### main

#### nav

导航

#### aside

一般表示非主体部分

#### hgroup

标题组

#### h1 - h6

标题

#### abbr

缩写

#### hr

分割线，一般表示话题转变

#### time

任何时间的表述

#### dfn

表述定义


## DOM API

### Node

* DocumentType
* Element
* Document
* CharacterData
* DocumentFragment

> childNodes为指针引用，随着DOM的变化实时发生改变

### 修改DOM

* appendChild
* insertBefore
* removeChild
* replaceChild

> 所有的DOM默认只有一个父节点。即把一个DOM插到另一个DOM树中，会自动从原DOM树中删除

### 其他API

* compareDocumentPoistion
* contains
* isEqualNode
* cloneNode 深拷贝节点