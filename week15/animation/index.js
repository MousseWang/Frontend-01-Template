
// 控制多个动画的动作
export class Timeline{

  constructor(){
    this.animations = [];
    this.tickID = null;
    this.pauseTime = null;
    this.state = 'inited';
    this.tick = () => {
      let t = Date.now() - this.startTime;
      console.log(t)
      let animations = this.animations.filter(animation => !animation.finished)
      for(let item of animations){
        
        let { object, property, template, timingFunction, start, end, duration, delay, startTime } = item;
        
        let progression = timingFunction((t - delay - startTime) / duration)
        
        if(t > duration + delay + startTime){
          progression = 1;
          item.finished = true;
        }
        console.log('progression:', progression)
        let value = item.valueFromProression(progression)
        if(progression > 0)
          object[property] = template(value);
  
      }
  
      if(animations.length)
        this.tickID = requestAnimationFrame(this.tick)
    }
  }

  pause(){
    if(this.state !== 'playing')
      return
    this.state = 'paused'
    this.pauseTime = Date.now();
    cancelAnimationFrame(this.tickID)
  }

  resume(){
    if(this.state !== 'paused')
      return
    this.state = 'playing'
    this.startTime += Date.now() - this.pauseTime;
    this.tick();
  }

  start(){
    if(this.state !== 'inited')
      return
    this.state = 'playing'
    this.startTime = Date.now();
    this.tick();
  }

  restart(){
    if(this.state === 'playing')
      return;
    this.animations = [];
    this.tickID = null;
    this.pauseTime = null;
    this.state = 'playing';
    this.startTime = Date.now();
    this.pauseTime = null;
    this.tick()
  }

  add(animation, startTime){
    this.animations.push(animation);
    animation.finished = false;
    if(this.state === 'playing'){
      animation.startTime = startTime !== void 0 ? startTime : Date.now() - this.startTime
    }
    else{
     animation.startTime = startTime !== void 0 ? startTime : 0
    }
  }
}

export class Animation{
  constructor(object, property, template, start, end, duration, delay, timingFunction){
    this.object = object;
    this.property = property;
    this.start = start;
    this.end = end;
    this.template = template;
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction
  }
  valueFromProression(proression){
    return this.start + proression * (this.end - this.start)
  }
}

export class ColorAnimation{
  constructor(object, property, start, end, duration, delay, timingFunction, template){
    this.object = object;
    this.property = property;
    this.start = start;
    this.end = end;
    this.template = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
    this.duration = duration;
    this.delay = delay;
    this.timingFunction = timingFunction
  }

  valueFromProression(proression){
    return {
      r: this.start.r + proression * (this.end.r - this.start.r),
      g: this.start.g + proression * (this.end.g - this.start.g),
      b: this.start.b + proression * (this.end.b - this.start.b),
      a: this.start.a + proression * (this.end.a - this.start.a),
    }
  }
}