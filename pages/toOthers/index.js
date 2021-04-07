// pages/toOthers/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    college:'',
    grade:'',
    role:'',
    school:'',
    signature:'',
    user_id:'',
    user_name:''
  },
  tomain:function(){
    wx.navigateTo({
      url: '../otherspage/index',
      success: (result) => {
        
      },
      fail: () => {},
      complete: () => {}
    });
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInst =  getApp();
    appInst.get('http://47.113.98.212:8000/api/v1/user',{
      openid:options.openid
    }).then((res)=>{
      this.setData({
        ...res.list
      })
    })
  },
  handleBack:function(){
    wx.navigateBack({
      delta: 1
    });
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
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
})