import axios from "axios";
/**
 * 对网络请求进行了封装
 *  将来如果axios不再用了，可以直接在这里改，不影响整个程序，
 *
 *  下面用了几种方法，推荐用Promise 终级方案；
 */

//4.Promise 终级解决方案
export function request(config) {
    //1.创建axios实例
    const instance =axios.create({
        baseURL:'http://123.207.32.32:8000/',
        timeout:5000
    })

    //2.axios拦截器
    //2.1请求拦截的作用
    instance.interceptors.request.use(conf=>{
        //console.log(conf);
        //1.比喻conf里面有不符合服务器的请求

        //2.比喻每次发送网络请求时，都希望在界面中显示一个请求的图标

        //3.某些网络请求（比喻登录（token）），必须携带一些特殊信息

        return conf;
    },error => {
        console.log(error)
    })
    //2.2响应拦截
    instance.interceptors.response.use(res=>{
        //console.log(res);
        return res.data;
    },error => {
        console.log(error);
    })

    //3.发送真正的请求
    return instance(config);
}

//自己提供的服务端数据
export function myRequest(config) {
  //1.创建axios实例
  const instance =axios.create({
    baseURL:'http://localhost:8080/rest/web/superviseH5/',
    timeout:5000
  })

  //2.axios拦截器
  //2.1请求拦截的作用
  instance.interceptors.request.use(conf=>{
    //console.log(conf);
    //1.比喻conf里面有不符合服务器的请求

    //2.比喻每次发送网络请求时，都希望在界面中显示一个请求的图标

    //3.某些网络请求（比喻登录（token）），必须携带一些特殊信息

    return conf;
  },error => {
    console.log(error)
  })
  //2.2响应拦截
  instance.interceptors.response.use(res=>{
    //console.log(res);
    return res.data;
  },error => {
    console.log(error);
  })

  //3.发送真正的请求
  return instance(config);
}