// miniprogram/pages/carInfo/carInfo.js
import {
  _request
} from "../../request/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal: "",
    options: [],
    carList: [],

  },
  // 总页数
  totalPages: 1,
  // 查询的数据
  QueryParams: {
    pageNo: 1,
    pageSize: 20,
    column: 'id',
    order: 'desc'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
    this.setData({
      search: this.search.bind(this)
    })
  },

  // 搜索
  search: function (value) {
    console.log(value)
    const carName = "*" + value + "*"
    _request({
      url: '/kCarinformation/list',
      data: {
        licensePlate: carName,
      },
    }).then((res) => {
      console.log('carName', res)
      const options = res.data.result.records.map(item => {
        return {
          text: `${item.licensePlate}`,
          value: `${item.licensePlate}`,
          licensePlate: `${item.licensePlate}`,
          id: `${item.id}`,
        }
      })
      console.log(options)
      this.setData({
        options: options
      })
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data.options)
      }, 200)
    })
  },
  selectResult: function (e) {
    console.log('select result', e.detail)
    wx.navigateTo({
      url: '../carInfoDetails/carInfoDetails?licensePlate=' + e.detail.item.licensePlate,
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


  // 获取分页数据
  getList() {
    _request({
      url: '/kCarinformation/list',
      data: this.QueryParams
    }).then((res) => {
      console.log(res)
      //获取数据总长度
      const total = res.data.result.total;
      //计算总页数
      this.totalPages = Math.ceil(total / this.QueryParams.pageSize)
      console.log(this.totalPages)
      this.setData({
        carList: [...this.data.carList, ...res.data.result.records]
      })
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
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
    //1 重置数组
    this.setData({
      carList: []
    })
    //2 重置页码
    this.QueryParams.pageNo = 1;
    //3 发送请求
    this.getList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //判断还有没有下一页数据
    if (this.QueryParams.pageNo >= this.totalPages) {
      //没有下一页数据
      // console.log('没有下一页')
      wx.showToast({
        title: '已加载全部数据',
      })
      this.data.showBottom = true
    } else {
      let that = this;
      //有下一页数据
      // console.log('还有下一页')
      wx.showLoading({
        title: '加载中',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 1000)
      that.QueryParams.pageNo++;
      // console.log(that.QueryParams.pagenum)
      that.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


})