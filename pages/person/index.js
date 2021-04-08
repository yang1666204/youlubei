// pages/person/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:'',
    list:{}
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
    console.log('个人中心');
    this.getTabBar().init();
    wx.getStorage({
      key: 'openId',
      success (res1) {
      console.log(res1);
      that.setData({
        openid:res1.data
      })
       wx.getStorage({
        key: 'userId',
        success (res) {
        console.log(res);
            app.get('http://47.113.98.212:8000/api/v1/user',{
        openid:res1.data,
        userId:res.data
    }).then(res=>{
                      console.log('111',res);   
                              that.setData({
                         list:res.list
                       })      
                  }).catch(err=>{
                      console.log('222',err)
                  }
                  )   
               
      },
      fail(){
        console.log("失败")
      },
      complete(){
      }
    })
      
                    
    },
    fail(){
      console.log("失败")
    },
    complete(){
      // console.log(a)
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
  toedit(){
    wx.navigateTo({
      url: '../edit/index',
      events: {  
      },
      success: function(res) {       
      }
    })
  }
})