import  axios  from "axios";

export function request(config) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const intance = axios.create({
      baseURL: 'http://catbk.cn:3000',
      timeout: 5000,
      // 跨域是否带token
      withCredentials: true,
    });
    // intance   就是一个axios
    intance(config)
      .then((value) => {
        resolve(value);
      }).catch((err) => {
        resolve(err);
      });

  });
}


