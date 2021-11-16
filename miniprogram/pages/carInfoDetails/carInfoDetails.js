// pages/carInfoDetails/carInfoDetails.js
const { _request } = require("../../request/request")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    carInfo:{},
    dispatch:''
  },
  licensePlate:'',
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.licensePlate = options.licensePlate
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
      url:'/kCarinformation/list',
      data:{
        licensePlate:this.licensePlate,
      }
    }).then(res =>{
      console.log(res)
      this.setData({
        carInfo:res.data.result.records[0]
      })
    })

    await _request({
      url:'/waybill/findDriverByDriver',
      data:{
        driver:this.data.carInfo.driver,
      }
    }).then(ret =>{
      console.log(ret)
      this.setData({
        dispatch:ret.data.result.dispatch,
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

  },
    // 点击查看车辆位置
    searchCarPosition(){
      wx.navigateTo({
        url: '../carPosition/carPosition?licensePlate='+this.licensePlate,
      })
    },
})