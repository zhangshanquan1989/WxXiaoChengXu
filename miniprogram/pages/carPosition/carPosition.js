// pages/carPosition/carPosition.js
import {_request} from "../../request/request"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 23.099994,
    longitude: 113.324520,
    markers:[],
  },
  licensePlate:'',

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.licensePlate = options.licensePlate
    this.getInfo()
  },

  // 根据车牌获取车辆位置信息
getInfo(){
  _request({
    url:'/kCarinformation/GetCarCurrent?string='+this.licensePlate
  }).then((res)=>{
    console.log(res)
    if(!res.data.result.anyType.GPSPoint){
      
      wx.showToast({
        title: '暂无车辆位置',
        icon: 'error',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 1
        })
      },1000)
    }else{
      this.setData({
        latitude:res.data.result.anyType.GPSPoint.last_lat,
        longitude:res.data.result.anyType.GPSPoint.last_lon
      })
      let result = []
      result.push({
        iconPath:"../../images/carPosition/car1.png",
        latitude:res.data.result.anyType.GPSPoint.last_lat,
        longitude:res.data.result.anyType.GPSPoint.last_lon,
        label:{
          content:res.data.result.anyType.GPSPoint.location,
          bgColor:'#fff',
        },
        width:40,
        height:20
      })
      this.setData({
        markers:result
      })
    }

  })
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

  }
})