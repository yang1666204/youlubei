// pages/edit/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    school:'',
    grade:'',
    xueyuan:'',
    studentid:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  submit(e){
    console.log(e.detail.value);
    const data = e.detail.value
    const app =  getApp();
    const that = this;
    wx.getStorage({
      key: 'openId',
      success (res) {
      console.log(res.data);   
      app.put('http://zzc0309.top:8000/api/v1/user?openid='+res.data,
       data       
      )
    },
    fail(){
      console.log("失败")
    }
  })
     
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
})