/**
 * 函数去抖
 * @param {Function} callBack 
 * @param {Number} delay 
 */
export function debounce(callBack, delay){
  let timer
  return function(){
    clearTimeout(timer)
    timer = setTimeout(()=>{
      callBack.apply(this)
    }, delay || 200)
  }
}

/**
 * 函数节流
 * @param {Function} callBack 
 * @param {Number} delay 
 */
export function throttle(callBack, delay){
  let flag = true
  return function(){
    if(flag){
      flag = false
      callBack.apply(this)
      setTimeout(()=>{
        flag = true
      }, delay || 200)
    }
  }
}