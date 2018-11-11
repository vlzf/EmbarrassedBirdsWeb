
/**
 * 图片文件 => Base64 字符串
 * @param {File} file 
 */
export function imgBase64(file){
  return new Promise((resolve, reject)=>{
    if(!(file instanceof File)) return reject('非文件')
    if(/(.jpg|.png)$/.test(file.name) === false) return reject('非图片')
    var reader = new FileReader()
    reader.onload = function(data){
      return resolve(data.target.result)
    }
    reader.readAsDataURL(file)  
  })
}


/**
 * 跨页面通信数据
 * @return {Object}
 */
export function createMes() {
  return {
    nav: { // 导航栏
      
    },
    create: {
      pid: null, // 试卷ID
    },
    personal: { // 个人中心
    },
    preview: { // 预览
      pid: null, // 试卷ID
    }
  }
}