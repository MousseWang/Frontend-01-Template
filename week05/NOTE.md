<!--
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-04-15 00:55:59
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-13 23:27:41
 -->
# Realm

## 结构化

### JS从结构化的角度，按照颗粒度由大到小划分可以归纳为如下结构

* Realm
* 宏任务
* 微任务
* 函数调用
* 语句/声明
* 表达式
* 直接量

### Realm

#### Realm可以理解为JS内置对象的集合。通常来说是结构化中颗粒度最大的概念。

#### 内置对象中包含值，函数对象，构造器对象三部分

![avatar](https://static001.geekbang.org/resource/image/6c/d0/6cb1df319bbc7c7f948acfdb9ffd99d0.png)

### 函数调用

#### 函数调用时会形成一个Execution Context栈，里面存放多个Execution Context

#### Execution Context

* code evaluation state
Generator和await中出现，记录代码执行的位置

* Function 
函数调用时出现，否则为null

* Script or Module
Script或Module调用时出现，否则为null

* Generator
Generator调用时出现，否则不存在

* Realm

* LexicalEnvironment

#### this

#### new.target

#### super

#### 变量

* VariableEnvironment

# 浏览器工作原理

### 浏览器工作流程

1. Http请求，拿到HTML文件

2. 解析HTML文件，生成DOM

3. 计算css，生成含有css规则的DOM

4. 绘制

5. 渲染

