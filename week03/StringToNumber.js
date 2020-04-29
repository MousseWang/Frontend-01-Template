/*
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-04-29 23:19:01
 * @LastEditors: wyao
 * @LastEditTime: 2020-04-30 00:28:22
 */


function StringToNumber(str, x){

  !!!x && (x = 10);

  const chars = str.split('');

  let number = 0;

  let numE = 0;

  let i = 0;

  let fac = 1;

  while(i < chars.length && chars[i] !== '.'){
    if(chars[i] === 'e'){
      numE = number;
      number = 0;
      i++
    }else{
      number = number * x
      number += chars[i].codePointAt(0) - '0'.codePointAt(0);
      i++;
    }
  }

  chars[i] === '.' && i++;

  if(numE !== 0){
    console.log(numE)
    number = numE * Math.pow(10,number)
  }

  while(i < chars.length){
    fac = fac / x;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fac;
    i++;
  }

  return number

}