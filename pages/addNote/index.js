// pages/showNote/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    tag:'',
    content:'',
    userId:'1',
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
    const that = this;
    wx.getStorage({
      key: 'userId',
      success (res) {
      console.log(res.data);
      that.setData({
        userId: res.data 
      })
    },
    fail(){
      console.log("失败")
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
  submit(e){
    console.log(e.detail.value,this.data.userId);
    const data = e.detail.value
    const app =  getApp();
    const that = this;
    wx.getStorage({
      key: 'openId',
      success (res) {
      console.log(res.data);
    const data2= {
        ...data,
        userId:that.data.userId
      }
      console.log(data2);
      app.post('http://zzc0309.top:8000/api/v1/notes?openid='+res.data,
       data2       
      )
    },
    fail(){
      console.log("失败")
    }
  })
     
  }
  
})