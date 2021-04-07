// pages/otherspage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    quslist:[],
    notelist:[],
  
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
    const that = this
    const app = getApp();
    wx.getStorage({
        key: 'openId',
        success (res) {
        console.log(res.data);
        that.setData({
          openid:res.data
        })
          app.get('http://47.113.98.212:8000/api/v1/user_post',{
          openid:res.data,
          userId:1
      }).then(res=>{
                        console.log('111', res );
                         that.setData({
                          quslist: res.lists 
                        })
                     
                    }).catch(err=>{
                        console.log('222',err )
                    }
                    )     
        app.get('http://47.113.98.212:8000/api/v1/user_note',{
          openid:res.data,
          userId:1
      }).then(res=>{
                        console.log('111', res );
                         that.setData({
                          notelist: res.lists 
                        })
                     
                    }).catch(err=>{
                        console.log('222',err )
                    }
                    )                            
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
  onTabchange(event) {
    const app = getApp();
    console.log(event.detail.title)
  //   app.get('http://zzc0309.top:8000/api/v1/notes',{
  //         openid:this.data.openid,
  //         tag:event.detail.title,
  //         page:"1"
  //     }).then(res=>{
  //                       console.log('111',res);
  //                        this.setData({
  //                         list: res.lists 
  //                       })                     
  //                   }).catch(err=>{
  //                       console.log('222',err )
  //                   })           
    
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  }
})