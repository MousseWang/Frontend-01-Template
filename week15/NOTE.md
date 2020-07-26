# 动画

## 时间轴

为了保证多个动画的时间一致性，在动画中通常需要定义时间轴。

时间轴的核心属性是开始时间与停止时间

### 动画开始

记录开始时间，调用动画执行函数 // requestAnimationFrame

### 动画暂停

记录停止时间，暂停动画执行函数 // cancelAnimationFrame

### 动画重新开始

记录停止时间，暂停动画执行函数 // requestAnimationFrame

## 动画执行函数设计

### 时间系数 progression

  `progression = (TimeNow - startTime - delay - addTime) / duration`

#### progression < 0

  动画在时间轴负向开始执行

#### progression = 0

  动画在初始轴点开始执行

#### progression = 1

  动画执行完毕


## 相关 API

### requestAnimationFrame

requestAnimationFrame接收一个回调函数作为参数，浏览器会在下次重绘之前调用该函数。回调函数执行次数通常是每秒60次，但在大多数遵循W3C建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。

### cancelAnimationFrame
cancelAnimationFrame用来停止requestAnimationFrame函数