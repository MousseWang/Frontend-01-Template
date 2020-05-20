function match(string){

    let state = start;

    for(let char of string){
      state = state(char);
    }

    return state === end

    function start(char){
      if( char === 'a'){
        return matcha1
      }else{
        return start
      }
    }

    function matcha1(char){
      if( char === 'b'){
        return matchb1
      }else{
        return start(char)
      }
    }

    function matchb1(char){
      if( char === 'a'){
        return matcha2
      }else{
        return start(char)
      }
    }

    function matcha2(char){
      if( char === 'b'){
        return matchbx
      }else{
        return start(char)
      }
    }

    function matchbx(char){
      if( char === 'x'){
        return end
      }else{
        return matchb1(char)
      }
    }

    function end(){
      return end
    }
    
}

console.log(match('abababx'))