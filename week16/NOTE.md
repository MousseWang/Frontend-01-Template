## 手势库

<a name="jWCjB"></a>
## 手势分类


<a name="uqzPA"></a>
### Tap

<br />点击<br />

<a name="eNPzu"></a>
### Pan

<br />拖动<br />

<a name="7HhMW"></a>
### Flick

<br />快速扫过
<a name="3HtVA"></a>
### Press

<br />按住<br />
<br />

![avatar](https://www.yuque.com/dushuxiaodepochaxiang/his6bp/ey4oa7?inner=vxO3Q)

## 事件派生

通过CustomEvent进行事件派生，即可以通过addEventListener监听该事件

```
  element.dispatchEvent(Object.assign(new CustomEvent('foo'), { bar: 123 }))
```

```
  element.addEventListener("foo", event => {
    console.log(event.bar) // bar = 123
  })
```

## 组件化设计思想 —— 添加事件

### 给组件添加属性

```
  <MyComponent onFoo={() => console.log('foo')} />
```

### 在wrap中解析attr并且对on开头的属性做处理

```
  if(name.match(/^on([\s\S]+)$/)){
    let eventName = RegExp.$1.replace(/^[\s\S]/, c => c.toLowerCase())
    this.addEventListener(eventName, val)
  }
```