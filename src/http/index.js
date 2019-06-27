/**
 * http请求封装
 */
import axios from "axios";
import store from "../store";
import * as util from "../utils/util";

let baseURL;
if (process.env.NODE_ENV !== "development") {
  baseURL = "http://localhost:8080/";
} else {
  baseURL = "http://localhost:8080/";
}

const instance = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  },
  transformRequest: [
    function(data) {
      let newData = "";
      for (let k in data) {
        if (data.hasOwnProperty(k) === true) {
          newData +=
            encodeURIComponent(k) + "=" + encodeURIComponent(data[k]) + "&";
        }
      }
      return newData;
    }
  ]
});

// 添加请求拦截器
instance.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.token =
      util.urlToJson(window.location.href).token || store.state.token;
    config.headers.system = "web";
    config.headers.appid = "1";
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    console.log(error);
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // console.log(response);
    let data = response.data;
    console.log(data);
    if (data.code == 1401) {
      // 需要登录
      return Promise.reject();
    } else if (data.code == 0) {
      // 失败
      return Promise.reject();
    }
    return data;
  },
  function(error) {
    // 对响应错误做点什么
    console.log(error);
    this.$toast({
      type: "fail",
      message: "请求失败！请稍后重试",
      duration: 1500
    });
    return Promise.reject(error);
  }
);

function apiAxios(method, url, params) {
  return new Promise((resolve, reject) => {
    instance({
      method,
      url,
      data: method === "POST" || method === "PUT" ? params : null,
      params: method === "GET" || method === "DELETE" ? params : null
    })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export default {
  get: function(url, params) {
    return apiAxios("GET", url, params);
  },
  post: function(url, params) {
    return apiAxios("POST", url, params);
  },
  put: function(url, params) {
    return apiAxios("PUT", url, params);
  },
  delete: function(url, params) {
    return apiAxios("DELETE", url, params);
  }
};
