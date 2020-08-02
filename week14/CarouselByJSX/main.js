import { create, Text, Wraper} from './createElement';

class Carousel{

    constructor(config){
        this.config = config;
        this.children = [];
        this.data = [
            "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
            "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
            "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
            "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
        ];
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
        this.render().mountTo(parent)
    }

    render(){

        let children = this.data.map(item => {
            let element = <img src={item} />;
            debugger
            element.addEventListener("dragstart", event => event.preventDefault())
            return element
        })

        let root = <div class='carousel'>
            {  children }
        </div>

        // 迁移
        let position = 0;
        
        let nextImg = () => {
          let nextPosition = (position + 1) % this.data.length

          let curr = children[position]
          let next = children[nextPosition]

          curr.style.transition = "ease 0s";
          next.style.transition = "ease 0s";

          curr.style.transform = `translateX(${ - 100 * position}%)`
          next.style.transform = `translateX(${100 -100 * nextPosition}%)`

          setTimeout(function(){
            curr.style.transition = "ease 0.5s";
            next.style.transition = "ease 0.5s";

            curr.style.transform = `translateX(${ -100 - 100 * position}%)`
            next.style.transform = `translateX(${-100 * nextPosition}%)`

            position = nextPosition
          }, 16)

          setTimeout(nextImg, 3000)
        }
        // 拖拽
        root.addEventListener('mousedown', event => {
            let startX = event.clientX;
            let lastPosition = (position - 1 + this.data.length) % this.data.length;
            let nextPosition = (position + 1) % this.data.length;
  
            let curr = children[position]
            let last = children[lastPosition]
            let next = children[nextPosition]
            // 停止动画
            curr.style.transition = "ease 0s";
            last.style.transition = "ease 0s";
            next.style.transition = "ease 0s";
  
            curr.style.transform = `translateX(${ - 500 * position}px)`
            last.style.transform = `translateX(${ -500 - 500 * lastPosition}px)`
            next.style.transform = `translateX(${ 500 - 500 * nextPosition}px)`
  
            let move = event => {
              curr.style.transform = `translateX(${ event.clientX - startX - 500 * position}px)`
              last.style.transform = `translateX(${ event.clientX - startX - 500 - 500 * lastPosition}px)`
              next.style.transform = `translateX(${ event.clientX - startX + 500 - 500 * nextPosition}px)`
            }
  
            let up = event => {
              let offset = 0;
              if(event.clientX - startX > 250){
                offset = 1;
              }else if(event.clientX - startX < -250){
                offset = -1;
              }
              // 开始动画
              curr.style.transition = "";
              last.style.transition = "";
              next.style.transition = "";
  
              curr.style.transform = `translateX(${ 500 * ( offset - position) }px)`
              last.style.transform = `translateX(${ 500 * ( offset - 1 - lastPosition) }px)`
              next.style.transform = `translateX(${ 500 * ( offset + 1 - nextPosition) }px)`
  
              position = (position - offset + this.data.length) % this.data.length;
  
              document.removeEventListener('mousemove', move);
              document.removeEventListener('mouseup', up);
            }
  
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
          })

        nextImg()

        return root
    }

}


let component = <Carousel data={[
        "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
        "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
        "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
        "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg"
    ]} />

component.mountTo(document.body)
