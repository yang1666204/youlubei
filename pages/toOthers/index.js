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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var appInst =  getApp();
    this.setData({
      user_id:options.user_id
    })
    wx.getStorage({
      key: 'openId',
      success: (result)=>{
        appInst.get('https://zzc0309.top/api/v1/user',{
          openid:result.data,
          userId:options.user_id
        }).then((res)=>{
          this.setData({
            ...res.list
          })
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
   
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