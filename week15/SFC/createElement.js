export function create(Cls, attr, ...children){
    
    let o;
    // 处理html标签
    if(typeof Cls === 'string'){
        o = new Wraper(Cls)
    }else{
        o = new Cls({
            config: {
                foo:1
            }
        });
    }
    
    for(let name in attr){
        // attr === prop
        // o[name] = attr[name]
        // attr !== prop
        o.setAttribute(name, attr[name])
    }

    let visit = (children) => {
        for(let child of children){
            if(typeof child === "object" && child instanceof Array){
                visit(child);
                return;
            }
            if(typeof child === "string")
                child = new Text(child);
            o.appendChild(child)
        }
    }

    visit(children)
    
    return o
}

export class Text{
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}

export class Wraper{

    constructor(type){
        this.children = [];
        this.root = document.createElement(type)
    }

    setAttribute(name, val){
        debugger
        this.root.setAttribute(name, val)
    }

    addEventListener(){
        this.root.addEventListener(...arguments);
    }
    
    get style(){
        return this.root.style;
    }

    appendChild(child){
        this.children.push(child)
    }

    mountTo(parent){
        parent.appendChild(this.root)
        for(let child of this.children){
            child.mountTo(this.root)
        }
    }

}