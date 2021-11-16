const { _request } = require("../../request/request")
import * as echarts from '../../ec-canvas/echarts';


let that = null;
function getOption(num,totalCarNum,color,startAngle){
  var option = {
    backgroundColor: "#ffffff",
    title: {
      // text: that.data.nianjianNum,
      text: num,
      left: "center",
      top: "30%",
      textStyle: {
        color: "#000000",
        fontSize: 12,
        align: "center"
      }
    },
    graphic: {
      type: "text",
      left: "center",
      top: "65%",
      style: {
        text: "总车数"+totalCarNum,
        textAlign: "center",
        fill: "#000000",
        fontSize: 6,
        fontWeight: 400
      }
    },
    series: [{
      label: {
        normal: {
          fontSize: 14
        }
      }, 
      type: 'pie',
      // 内外圈
      radius: ['80%', '90%'],
      // 颜色
      color: [color, '#D2D2D2FF'],
      // 起始角度
      startAngle: startAngle, //起始角度
      labelLine: {
        show: false
      },
      data: [{
        // value: that.data.nianjianNum,
        value: num,
        // name: '待检',
      }, {
        value: totalCarNum-num,
        // name: '其他',
      }]
    }]
  };
  return option;
};

let nianjianEchart;
function initChartNianJian(canvas, width, height, dpr) {
  //初始化echarts元素，绑定到全局变量，方便更改数据 Component 
  if(that.data.nianjianNum >=0){
    nianjianEchart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new chart
    });
    canvas.setChart(nianjianEchart);
    nianjianEchart.setOption(getOption(that.data.nianjianNum,that.data.totalCarNum,'#9DB7CDFF',45));
    return nianjianEchart;
  }
};

let baoxianEchart;
function initBaoXian(canvas, width, height, dpr) {
  //初始化echarts元素，绑定到全局变量，方便更改数据
  if(that.data.baoxianNum >=0){
    baoxianEchart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new chart
    });
    canvas.setChart(baoxianEchart);
    baoxianEchart.setOption(getOption(that.data.baoxianNum,that.data.totalCarNum,'#B3161AFF',0));
    return baoxianEchart;
  }
};

let weizhangEchart;
function initWeiZhang(canvas, width, height, dpr) {
  //初始化echarts元素，绑定到全局变量，方便更改数据
  if(that.data.baoxianNum >=0){
    weizhangEchart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new chart
    });
    canvas.setChart(weizhangEchart);
    weizhangEchart.setOption(getOption(that.data.weizhangNum,that.data.totalCarNum,'#E3C191FF',0));
    return weizhangEchart;
  }
};

let baozhengjinEchart;
function initBaoZhengJin(canvas, width, height, dpr) {
  //初始化echarts元素，绑定到全局变量，方便更改数据
  if(that.data.baozhengjinNum >=0){
    baozhengjinEchart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new chart
    });
    canvas.setChart(baozhengjinEchart);
    baozhengjinEchart.setOption(getOption(that.data.baozhengjinNum,that.data.totalCarNum,'#E3C191FF',0));
    return baozhengjinEchart;
  }
};

let diaodufeiEchart;
function initDiaoDuFei(canvas, width, height, dpr) {
  //初始化echarts元素，绑定到全局变量，方便更改数据
  if(that.data.diaodufeiNum >=0){
    diaodufeiEchart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new chart
    });
    canvas.setChart(diaodufeiEchart);
    diaodufeiEchart.setOption(getOption(that.data.diaodufeiNum,that.data.totalCarNum,'#5876ABFF',90));
    return diaodufeiEchart;
  }
};

let jiashizhengEchart;
function initJiaShiZheng(canvas, width, height, dpr) {
  //初始化echarts元素，绑定到全局变量，方便更改数据
  if(that.data.jiashizhengNum >=0){
    jiashizhengEchart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new chart
    });
    canvas.setChart(jiashizhengEchart);
    jiashizhengEchart.setOption(getOption(that.data.jiashizhengNum,that.data.totalCarNum,'#5876ABFF',90));
    return jiashizhengEchart;
  }
};


// miniprogram/pages/home/home.js
// mychart-dom-line
Page({


  /**
   * 页面的初始数据
   */
  data: {
    workerName:'测试账号',
    totalCarNum:'',
    nianjianNum:'',
    baoxianNum:'',
    baozhengjinNum:'',
    // yajinNum:'',
    diaodufeiNum:'',
    weizhangNum:'',
    jiashizhengNum:'',
    ecNianJian: {onInit: initChartNianJian},
    ecBaoXian:{onInit: initBaoXian},
    ecWeiZhang:{onInit: initWeiZhang},
    ecBaoZhengJin:{onInit:initBaoZhengJin},
    // ecYaJin:{onInit: initYaJin},
    ecDiaoDuFei:{onInit: initDiaoDuFei},
    ecJiaShiZheng:{onInit: initJiaShiZheng},
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    that = this;
    // this.getList();
    this.getTotalCarNum();
    this.getNianJianNum();
    this.getJiaShiZhengNum();
    this.getBaoXianNum();
    this.getBaoZhengJinNum();
    // this.getWeiZhangNum();
    // this.getDiaoDuFeiNum();
    const workerName = wx.getStorageSync("name")
    this.setData({
      workerName
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
      url: '/base/company/list',
    }).then((res) => {
      console.log('company', res)
    })
  },
  // 获取车辆总数
  getTotalCarNum(){
    _request({
      url:'/YMpageController/selectAll',
    }).then(res=>{
      this.setData({
        totalCarNum:res.data.result.年检车辆总数
      })
      console.log('总车数',res)
    })
  },
  // 获取待年检车辆数
  getNianJianNum(){
    _request({
      url:'/YMpageController/selectYnjWnj'
    }).then(res=>{
      this.setData({
        nianjianNum:res.data.result.年检即将到期的车辆总数
      })
      setTimeout(()=>{
        this.setData({
          ecNianJian: {onInit: initChartNianJian},
        })
      },)
      console.log(res)
    })
  },
  // 获取保险到期车辆数
  getBaoXianNum(){
    _request({
      url:'/YMpageController/selectBaoYW'
    }).then(res=>{
      this.setData({
        baoxianNum:res.data.result.三十天内保险即将到期的车辆总数
      })
      console.log(res)
    })
  },
    // 获取保证金到期车辆数
    getBaoZhengJinNum(){
      _request({
        url:'/YMpageController/selectbaozhengjinYW'
      }).then(res=>{
        this.setData({
          baozhengjinNum:res.data.result.押金小于500的车辆总数

        })
        console.log(res)
      })
    },
  // 获取违章待处理车辆数 getWeiZhangNum
  getWeiZhangNum(){
    _request({
      url:'/YMpageController/selectWeizhangW'
    }).then(res=>{
      this.setData({
        weizhangNum:res.data.result.未处理违章总数
      })
      console.log(res)
    })
  },
    // 获取调度费到期车辆数 
    getDiaoDuFeiNum(){
      _request({
        url:'/YMpageController/selectdiaodufeiYM'
      }).then(res=>{
        this.setData({
          diaodufeiNum:res.data.result.调度费到期车辆总数
        })
        console.log(res)
      })
    },
    // 获取驾驶证到期车辆数 
    getJiaShiZhengNum(){
      _request({
        url:'/SumController/HHDjaishizhengD'
      }).then(res=>{
        this.setData({
          jiashizhengNum:res.data.result.司机驾驶证到期总数
        })
        console.log(res)
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
    this.setData({
      totalCarNum:'',
      nianjianNum:'',
      baoxianNum:'',
      baozhengjinNum:'',
      // yajinNum:'',
      diaodufeiNum:'',
      weizhangNum:'',
      jiashizhengNum:'',
    })
    this.onLoad()
    this.setData({
      ecNianJian: {onInit: initChartNianJian},
    ecBaoXian:{onInit: initBaoXian},
    ecWeiZhang:{onInit: initWeiZhang},
    ecBaoZhengJin:{onInit:initBaoZhengJin},
    // ecYaJin:{onInit: initYaJin},
    ecDiaoDuFei:{onInit: initDiaoDuFei},
    ecJiaShiZheng:{onInit: initJiaShiZheng},
    })
    //关闭下拉刷新的窗口
    wx.stopPullDownRefresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})