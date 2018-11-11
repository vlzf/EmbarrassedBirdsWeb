import originAxios from 'axios'

export const axios = originAxios.create({
  transformRequest: [function (data) {
    return dealData(data)
  }],
  headers:{'Content-Type':'application/x-www-form-urlencoded'}
})

function dealData(data){
  var d = ''
  for(let key in data){
    d = '&'+ key +'='+ data[key]
  }
  if(d){
    d = '?' + d.slice(1)
  }
  return d
}