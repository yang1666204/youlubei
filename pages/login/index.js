// pages/login/index.js

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index:0,
    arr_identify:["请选择","学生","执教","老师"],
    isShow:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success: res => {
        var code = res.code// 登录凭证
        wx.request({
          url: 'https://zzc0309.top/wxAuth',
          data: {
            code:code
          },
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            //获取openId,useid全部存缓存中 
            console.log("result",result);  
            //是否允许进入小程序
            if(result.data.data.authority === 0){
              console.log("a");
              app.globalData.isAuthority = true
            }
            wx.setStorage({
              key:"openId",
              data:result.data.data.openid
            })
            app.globalData.openId = result.data.data.openid;
            app.globalData.userId = result.data.data.userId;
            wx.setStorage({
              key:"userId",
              data:result.data.data.userId
            })
          },
          fail: (err) => {
          },
          complete: () => {}
        });
          
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  _handleSubmit:function(e){
    var value = e.detail.value
    console.log(value);
    if(!value.name || !value.stu_id || !value.picker){
      wx.showToast({
        title: '请填写完整',
        icon:'error'
      })
      return
    }
    if(value.picker == '请选择'){
      wx.showToast({
        title: '未选择身份信息',
        icon:'error'
      })
      return
    }
    if( typeof(value.name) != 'string'){
      wx.showToast({
        title: '姓名填写错误',
        icon:'error'
      })
      return
    }
    
    if(value.stu_id.length != 10){
      wx.showToast({
        title: '学号填写错误',
        icon:'error'
      })
      return
    }
    
    var userInfo = {
      name:value.name,
      stuNumber:value.stu_id,
      identify:value.picker
    }
    wx.switchTab({
      url: '../index/index',
      success:()=>{
        wx.setStorageSync('userInfo', userInfo)
      }
    })
    console.log(e.detail.value);
  },

  bindPickerChange: function(e) {
    this.setData({
      index: e.detail.value
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