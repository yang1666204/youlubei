// pages/person/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    list:{},

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
     const app = getApp();
    this.getTabBar().init();
      that.setData({
                      list:app.globalData.studentinfo
                    })      
  //   wx.getStorage({
  //     key: 'openId',
  //     success (res1) {
  //     that.setData({
  //       openid:res1.data
  //     })
  //      wx.getStorage({
  //       key: 'userId',
  //       success (res) {
  //           app.get('https://zzc0309.top/api/v1/user',{
  //       openid:res1.data,
  //       userId:res.data
  //   }).then(res=>{
  //                             that.setData({
  //                        list:res.list
  //                      })      
  //                 }).catch(err=>{
  //                 }
  //                 )   
               
  //     },
  //     fail(){
  //     },
  //     complete(){
  //     }
  //   })
      
                    
  //   },
  //   fail(){
  //   },
  //   complete(){
  //   }
  // })
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
  // toedit(){
  //   wx.navigateTo({
  //     url: '../../packageB/pages/edit/index',
  //     events: {  
  //     },
  //     success: function(res) {       
  //     }
  //   })
  // },
  tochangeavatar(){
    wx.navigateTo({
      url: '../../packageB/pages/changeavatar/index',
      events: {  
      },
      success: function(res) {       
      }
    })
  },
  showpic(){
    let urls = []
    urls[0] = this.data.list.avatar;
   wx.previewImage({
     urls:  urls  // 需要预览的图片http链接列表
     })
 }
})