// miniprogram/pages/login/login.js

import { _request } from "../../request/request.js" 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    password:'',
    captcha:'',
    randomImage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRandomImage();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取账号

getUserName: function(e) {
  var value = e.detail.value; //获取输入的内容
  this.setData({
    username:value,//改变page--data中username的值
  })
  wx.setStorageSync('username', value);//将获取到的username值存入本地缓存空间
},
// 密码
getPassword:function(e) {
  var value = e.detail.value;
  this.setData({
    password: value,
  })
  wx.setStorageSync('password', value);
},
// 验证码
getCaptcha:function(e) {
  var value = e.detail.value;
  this.setData({
    captcha: value,
  })
  wx.setStorageSync('password', value);
},
  // 获取登录验证码
  getRandomImage(){
    _request({
      url: '/tPmAuthority/randomImage/abc', 
    }).then((res)=>{
      console.log(res)
        this.setData({
          randomImage:res.data.result
        }) 
    })
    // wx.request({
    //   url: 'http://81.70.151.121:8080/jeecg-boot/tPmAuthority/randomImage/abc',
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: (res) =>{
    //     console.log(res)
    //     this.setData({
    //       randomImage:res.data.result
    //     }) 
    //   }
    // }) 
  },
  // 重新获取验证码
  handleNewImg(){
    this.getRandomImage()
  },
  // 登录
  login:function(){
    // wx.request({
    //   url: 'http://81.70.151.121:8080/jeecg-boot/tPmAuthority/login', 
    //   method:'POST',
    //   data: {
    //     username: this.data.username,
    //     password: this.data.password,
    //     checkKey: 'abc',
    //     captcha:this.data.captcha
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success (res) {
    //     console.log(res.data)
    //   }
    // })

    _request({
      url: '/kaccount/login', 
      method:'POST',
      data: {
        username: this.data.username,
        password: this.data.password,
        checkKey: 'abc',
        captcha:this.data.captcha
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
    }).then((res)=>{
      console.log(res)
      if(res.data.code == 200){
        wx.setStorageSync('satoken', res.data.result.satoken)
        wx.setStorageSync('name', res.data.result.name)
        wx.switchTab({
          url: '../home/home',
        })
      }else{
        
          wx.showToast({
            title: res.data.message,
            icon: 'error',
            duration: 1500
          })
      
        
      
      }
       
    })
  },
})