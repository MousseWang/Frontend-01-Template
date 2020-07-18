<!--
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-04-15 00:55:59
 * @LastEditors: wyao
 * @LastEditTime: 2020-06-03 21:12:29
--> 
## 选择器
### 复合选择器
##### 简单选择器简单选择器...简单选择器
```
.id.name#data1{
    // something...
}
```
> *或者div需要写在最前面
### 复杂选择器
##### 简单选择器<连接符>简单选择器
## 优先级
### 简单选择器
##### id > class = attr > tags
```
#id div.a#id{}
// [0,2,1,1]
// s = 0 * N^3 + 2 * N^2 + 1 * N + 1 (N为任意进制)
```
> *, :not 不参与权重计算
## 伪类
*  :any-link
*  :link
*  :visited
*  :hover
*  :active
*  :focus
*  :target
*  :empty
*  :nth-child
*  :nth-last-child
*  :first-child, :last-child, :only-child
*  :not
## 伪元素
*  ::before
*  ::after
*  ::first-letter
*  ::first-line

## 盒模型
###行盒
行盒为虚拟概念。即可以把一行看作一个盒模型。

若行中为一个block，行盒中只有一个block。

若行中为多个inline，行盒可以看做多个inline的集合。