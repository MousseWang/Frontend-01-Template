/*
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-05-20 00:58:35
 * @LastEditors: wyao
 * @LastEditTime: 2020-05-27 00:47:16
 */ 
module.exports.parseHTML = function parseHTML(html){

  let state = data;
  const EOF = Symbol('EOF');
  let currToken = null;
  let currAttr = null;
  let currTextNode = null;
  let stack = [{type: 'document', children: []}]

  function emit(token){
    let top = stack[stack.length - 1];
    if(token.type === 'startTag'){
      let element = {
        type: 'element',
        children: [],
        atrr: []
      }

      element.tagName = token.tagName;

      for(let key in token){
        if(key !== 'type' && key !== 'tagName'){
          element.atrr.push({
            name: key,
            value: token[key]
          })
        }
      }

      top.children.push(element);
      element.parent = top;

      if(!token.isSelfClosing){
        stack.push(element)
      }

      currTextNode = null;

    }else if(token.type === 'endTag'){

      if(top.tagName !== token.tagName){
        throw new Error('connot match!')
      }else{
        stack.pop();
      }

      currTextNode = null;
    }else if(token.type === 'text'){
      if(currTextNode === null){
        currTextNode = {
          type: 'text',
          content: ''
        }
        top.children.push(currTextNode)
      }
      currTextNode.content += token.content;
    }
  }

  function data(char){
    if(char === '<'){
      return tagOpen;
    }else if(char === EOF){
      emit({
        type: 'EOF'
      })
      return;
    }else{
      emit({
        type: 'text',
        context: char
      })
      return data;
    }
  }

  function tagOpen(char){
    if(char === '!'){
      throw Error('cannot match the char --!--');
    }else if(char === '/'){
      return endTagOpen;
    }else if(char.match(/^[a-zA-Z]$/)){
      currToken = {
        type: 'startTag',
        tagName: ''
      }
      return tagName(char)
    }else{
      return;
    }
  }

  function endTagOpen(char){
    if(char.match(/^[a-zA-Z]$/)){
      currToken = {
        type: 'endTag',
        tagName: ''
      }
      return tagName(char)
    }else if(char === '>'){
      return;
    }else if(char === EOF){
      emit({
        type: 'EOF'
      })
      return;
    }else{
      return;
    }
  }

  function beforeAttrName(char){
    if(char.match(/^[\t\n\f ]$/)){
      return beforeAttrName;
    }else if(char === '/' || char === '>' || char === EOF){
      return afterAttrName(char)
    }else if(char === '='){

    }else{
      currAttr = {
        name: '',
        value: ''
      }
      return attrName(char);
    }
  }

  

  function attrName(char){
    if(char.match(/^[\t\n\f ]$/) || char === '/' || char === '>' || char === EOF){
      return afterAttrName;
    }else if(char === '='){
      return beforeAttrValue;
    }else if(char === '\u0000'){

    }else if(char === '\'' || char === '"' || char === '<'){

    }else{
      currAttr.name += char;
      return attrName;
    }
  }

  function afterAttrName(char){
    if(char.match(/^[\t\n\f ]$/)){
      return afterAttrName;
    }else if(char === '='){
      return beforeAttrValue;
    }else if(char === '>'){
      return data;
    }else if(char === '\u0000'){

    }else if(char === '\''){
      return selfClosingStartTag
    }else{
      return attrName(char);
    }
  }

  function beforeAttrValue(char){
    if(char.match(/^[\t\n\f ]$/)){
      return beforeAttrValue;
    }else if(char === '"'){
      return doubleQuotedAttrValue;
    }else if(char === '\''){
      return singleQuotedAttrValue;
    }else if(char === char === '/' || char === '>' || char === EOF){
      return data;
    }else{
      return unquotedAttrValue(char);
    }
  }

  function doubleQuotedAttrValue(char){
    if(char === '"'){
      currToken[currAttr.name] = currAttr.value;
      return afterDoubleQuotedAttrValue;
    }else if(char === EOF){
      return data;
    }else{
      currAttr.value += char;
      return doubleQuotedAttrValue
    }
  }

  function afterDoubleQuotedAttrValue(char){
    if(char.match(/^[\t\f\n ]$/)){
      return beforeAttrName
    }else if(char === '/'){
      return selfClosingStartTag;
    }else if(char === '>'){
      emit(currToken);
      return data;
    }else if(char === '\u0000' || char === '\'' || char === '"' || char === '<' || char === '=' || char === '`'){

    }else if(c === EOF){
      return data;
    }else{
      currAttr.value += char;
      return doubleQuotedAttrValue
    }
  }

  function singleQuotedAttrValue(){
    if(char === '\''){
      currToken[currAttr.name] = currAttr.value;
      return afterSingleQuotedAttrValue;
    }else if(char === EOF){
      return data;
    }else{
      currAttr.value += char;
      return doubleQuotedAttrValue
    }
  }

  function afterSingleQuotedAttrValue(char){
    if(char.match(/^[\t\f\n ]$/)){
      return beforeAttrName
    }else if(char === '/'){
      return selfClosingStartTag;
    }else if(char === '>'){
      emit(currToken);
      return data;
    }else if(char === '\u0000' || char === '\'' || char === '"' || char === '<' || char === '=' || char === '`'){

    }else if(c === EOF){
      return data;
    }else{
      currAttr.value += char;
      return singleQuotedAttrValue
    }
  }

  function unquotedAttrValue(char){
    if(char.match(/^[\t\n\f ]$/)){
      currToken[currAttr.name] = currAttr.value;
      return beforeAttrName;
    }else if(char === '/'){
      currToken[currAttr.name] = currAttr.value;
      return selfClosingStartTag;
    }else if(char === '>'){
      currToken[currAttr.name] = currAttr.value;
      emit(currToken);
      return data;
    }else if(char === '\u0000' || char === '\'' || char === '"' || char === '<' || char === '=' || char === '`'){

    }else if(c === EOF){
      return data;
    }else{
      currAttr.value += char;
      return unquotedAttrValue
    }
  }

  function tagName(char){
    if(char.match(/^[\t\n\f ]$/)){
      return beforeAttrName;
    }else if(char === '/'){
      return selfClosingStartTag;
    }else if(char.match(/^[a-zA-Z]$/)){
      currToken.tagName += char;
      return tagName;
    }else if(char == '>'){
      emit(currToken)
      currToken = null;
      return data
    }else{
      return
    }
  }

  function selfClosingStartTag(char){
    if(char === '>'){
      currToken.isSelfClosing = true;
      emit(currToken);
      return data;
    }else if(char === EOF){
      emit({
        type: 'EOF'
      })
      return;
    }else{
      return;
    }
  }

  for(const char of html){
    if(state instanceof Function){
      state = state(char)
    }else{
      // debugger
    }
    
  }

  state = state(EOF)
  debugger
  console.log(stack[0])

}