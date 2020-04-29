/*
 * @Descripttion: 
 * @Author: wyao
 * @Date: 2020-04-29 23:19:01
 * @LastEditors: wyao
 * @LastEditTime: 2020-04-30 00:02:18
 */


function StringToNumber(str, x){

  !!!x && (x = 10);

  const chars = str.split('');

  let number = 0;

  let i = 0;

  let fac = 1;

  while(i < chars.length && chars[i] !== '.'){
    number = number * x
    number += chars[i].codePointAt(0) - '0'.codePointAt(0);
    i++;
  }

  chars[i] === '.' && i++;

  while(i < chars.length){
    fac = fac / x;
    number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fac;
    i++;
  }

  return number

}