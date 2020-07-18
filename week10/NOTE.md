<!--
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-04-15 00:55:59
 * @LastEditors: wyao
 * @LastEditTime: 2020-06-26 13:30:15
--> 
## Range API

### range API 是DOM API的一部分

range代表dom中的一个片段

创建

new Range()


range.setStart
range.setEnd

range.setStartBefore
range.setEndBefore
range.setStartAfter
range.setEndAfter

range可以精细的对元素节点进行选中和切割

## CSSOM

document.styleSheets[0].cssRules

document.styleSheets[0].insertRule("p { color: pink; }", 0)

document.styleSheets[0].removeRule(0)

