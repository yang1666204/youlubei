// pages/myquestion/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_avatar:'',
    user_name:'',
    signature:'',
    lists:[],
    user_attention_num:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("app",app);
    var user = app.globalData.studentinfo
    this.setData({
      user_avatar:user.avatar,
      signature:user.signature,
      user_name:user.user_name
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
    var openId = wx.getStorageSync('openId')
    var userId = wx.getStorageSync('userId')
    wx.request({
      url: 'http://zzc0309.top:8000/api/v1/attention_user?'+'openid='+openId+'&userId='+userId+'&userId02='+userId,
      method:"GET",
      success:(res)=>{
        console.log(res);
        this.setData({
          lists:res.data.data.lists,
          user_attention_num:res.data.data.lists.length
        })
      }
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
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
})