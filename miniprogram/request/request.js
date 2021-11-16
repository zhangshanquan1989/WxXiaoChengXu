export const _request = (params) => {
  // 定义公共的url
  // const baseUrl = "http://81.70.151.121:8080/jeecg-boot"
  const baseUrl = "https://tkhhd.com/jeecg-boot"
  const satoken = wx.getStorageSync("satoken")
  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      url:baseUrl+params.url,
      header: {
        'satoken': satoken // 默认值
      },
      success:(result)=>{
        resolve(result);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}