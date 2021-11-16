// pages/driverInfoDetails/driverInfoDetails.js
const { _request } = require("../../request/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    driverInfo:{},
    dispatch:'',
    emergencyname:'',
    emergencyphone:'',
    
  },
  driverId:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.driverId = options.driverId
    this.getInfo()
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
  // 获取数据
  async getInfo(){
    await _request({
      url:'/kDriver/list',
      data:{
        id:this.driverId,
      }
    }).then(res =>{
      console.log(res)
      this.setData({
        driverInfo:res.data.result.records[0]
      })
    })
    await _request({
      url:'/waybill/findDriverByDriver',
      data:{
        driver:this.data.driverInfo.name,
      }
    }).then(ret =>{
      console.log('调度',ret)
      this.setData({
        dispatch:ret.data.result.dispatch,
        emergencyname:ret.data.result.emergencyname,
        emergencyphone:ret.data.result.emergencyphone
      })
    })
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

  }
})