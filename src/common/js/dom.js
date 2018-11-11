/**
 * 事件委托
 * @param {HTMLElement} parent 
 * @param {String} className 
 * @param {String} type
 * @param {Function} callback 
 */
export function onEvent(parent, className, type, callback){
  let reg = new RegExp('\\b'+ className +'\\b')
  parent.addEventListener(type, (e)=>{
    let target = e.target
    while(target !== parent && !reg.test(target.className)){
      target = target.parentElement
    }
    if(target === parent) return
    callback.apply(target)
  })
}