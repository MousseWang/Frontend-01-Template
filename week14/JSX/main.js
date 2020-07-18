import './foo.js'

function create(Cls, attr, ...children){
    
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
    for(let child of children){
        if(typeof child === "string")
            child = new Text(child);
        o.appendChild(child)
    }
    return o
}

class Text{
    constructor(text) {
        this.children = [];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}

class Wraper{

    constructor(type){
        this.children = [];
        this.root = document.createElement(type)
    }

    setAttribute(name, val){
        this.root.setAttribute(name, val)
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

class MyComponent{

    constructor(config){
        this.config = config;
        this.children = [];
        this.root = document.createElement('div')
        console.log('config', config)
    }

    setAttribute(name, val){
        this.root.setAttribute(name, val)
    }

    appendChild(child){
        this.children.push(child)
    }

    mountTo(parent){
        this.slot = <div></div>
        for(let child of this.children){
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent)

    }

    render(){
        return <div style="width:100px; height:100px; background:lightpink">
            <div>header</div>
            {this.slot}
            <div>footer</div>
        </div>
    }

}


let component = <MyComponent>
    <p>text</p>
</MyComponent>

component.mountTo(document.body)

console.log(component)

component.class = '123'