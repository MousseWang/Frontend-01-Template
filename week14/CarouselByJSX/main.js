import { create, Text, Wraper} from './createElement';

class Carousel{

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