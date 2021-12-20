import {request,myRequest} from "./request";

export function getHomeMulitidata() {
  return request({
    url:'/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request({
    url:'home/data',
    params:{
      type,
      page
    }
  })
}

export function getMyHomeGoods(type,page) {
  return myRequest({
    url:'/data',
    params:{
      type,
      page
    }
  })
}