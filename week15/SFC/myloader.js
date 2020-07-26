const parser = require('./parser')

module.exports = function(source, map) {
  // console.log(source)
  const tree = parser.parseHTML(source)
  
  let template = null;
  let script = null;

  for(let node of tree.children) {
    if(node.tagName == 'template'){
      template = node.children.filter(e => e.type != "text")[0]
    }
    if(node.tagName == 'script'){
      script = node.children[0].content;
    }
  }

  let createCode = "";

  let visit = (node) => {
    if(node.type === "text"){
      return JSON.stringify(node.content)
    }
    let attrs = {};
    for(let attr of node.attributes){
      attrs[attr.name] = attr.value;
    }

    let children = node.children.map(node => visit(node))
    return`create("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
  }
  // visit(template)

  let r = `
import { create, Text, Wraper} from './createElement';
export class Carousel{
  setAttribute(name, val){
    this[name] = val;
  }
  render(){
    console.log(create)
    return ${visit(template)}
  }
  mountTo(parent){
    this.render().mountTo(parent)
  }
}  
`
console.log(r)
return r
}

