// pages/mypage/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    active:0,
    avatar:'',
    quslist:[],
    notelist:[],
    commentList:[],
    user_name:'',
    quslist_length:'',
    commentList_length:'',
    notelist_length:'',
    signature:'',
    //个性签名
    //用于初始页面渲染
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(options)
    
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
        that.setData({
          openid:res.data,
          avatar:app.globalData.studentinfo.avatar,
          signature:app.globalData.studentinfo.signature,
          user_name:app.globalData.studentinfo.user_name
        })
          app.get('https://zzc0309.top/api/v1/user_post',{
          openid:res.data,
          userId:app.globalData.userId
      }).then(res=>{
                        console.log('qus',res.lists)
                         that.setData({
                          quslist: res.lists,
                          quslist_length : res.lists.length
                        })
                     
                    }).catch(err=>{
                   
                    })     
        app.get('https://zzc0309.top/api/v1/user_note',{
          openid:res.data,
          userId:app.globalData.userId
      }).then(res=>{
                         console.log('note',res.lists)
                         that.setData({
                          notelist: res.lists,
                          notelist_length: res.lists.length
                        })
                     
                    }).catch(err=>{
                  
                    })  
        app.get('https://zzc0309.top/api/v1/user_comment',{
          openid:res.data,
          userId:app.globalData.userId
      }).then(res=>{
                     console.log('commentList',res.lists)
                         that.setData({
                          commentList: res.lists,
                          commentList_length: res.lists.length
                        })
                     
                    }).catch(err=>{
               
                    }
                    )                            
      },
      fail(){
     
      },
      complete(){
     
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

  //   app.get('http://zzc0309.top:8000/api/v1/notes',{
  //         openid:this.data.openid,
  //         tag:event.detail.title,
  //         page:"1"
  //     }).then(res=>{
  //               
  //                        this.setData({
  //                         list: res.lists 
  //                       })                     
  //                   }).catch(err=>{
  //             
  //                   })           
    
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  }
})