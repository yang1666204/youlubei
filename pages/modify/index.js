// pages/modify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     noteId:'',
     detail:{
      // avatar: "http://zzc0309.top:8000/upload/images/abbe5176b270d63c1b42ed1fc0a84e99.png",
      // content: "一张嘴能吃透多少时光？一张嘴能抖落多少心声？一张嘴能封堵多少毒箭？悬河极速落下洗刷清白无数蜜糖涂抹殷情迷惑贪欲既然祸从口出那就谦卑不语既然口是心非那就装腔作势既然问心无愧那就和盘托出虚实相交处肌肉最发达部位非它莫属一张嘴能吃透多少时光？一张嘴能抖落多少心声？一张嘴能封堵多少毒箭？悬河极速落下洗刷清白无数蜜糖涂抹殷情迷惑贪欲既然祸从口出那就谦卑不语既然口是心非那就装腔作势既然问心无愧那就和盘托出虚实相交处肌肉最发达部位非它莫属一张嘴能吃透多少时光？一张嘴能抖落多少心声？一张嘴能封堵多少毒箭？悬河极速落下洗刷清白无数蜜糖涂抹殷情迷惑贪欲既然祸从口出那就谦卑不语既然口是心非那就装腔作势既然问心无愧那就和盘托出虚实相交处肌肉最发达部位非它莫属一张嘴能吃透多少时光？一张嘴能抖落多少心声？一张嘴能封堵多少毒箭？悬河极速落下洗刷清白无数蜜糖涂抹殷情迷惑贪欲既然祸从口出那就谦卑不语既然口是心非那就装腔作势既然问心无愧那就和盘托出虚实相交处肌肉最发达部位非它莫属",
      // created_on: 0,
      // note_id: 4,
      // tag: "哲学",
      // title: "既然生命都要死亡,生命的意义是什么?",
      // user_name: "黑黑"
     },
     avater:  '',
     user_name: '',
     isdisabled:false,
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
    const eventChannel = this.getOpenerEventChannel()
    const app = getApp();
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log( data.noteId)
      that.setData({
        noteId: data.noteId 
      })
      wx.getStorage({
        key: 'openId',
        success (res3) {
          app.get('https://zzc0309.top/api/v1/note',{
          openid:res3.data,
          noteId:data.noteId,
      }).then(res=>{
                
                        that.setData({
                          detail: res.lists, 
                          
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
  delete(){
    const app =  getApp();
    const that = this;
    wx.vibrateShort();
    console.log(123) 
    wx.showModal({
      title: '提示',
      content: '确定删除吗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.getStorage({
            key: 'openId',
            success (res) {           
          const data= {
              userId:app.globalData.userId,
              noteId:that.data.noteId
            }
            app.del('https://zzc0309.top/api/v2/notes?openid='+res.data,
             data       
            ).then(res=>{
              console.log(res)
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            }).catch(err=>{
                console.log(err)
            })
            
          
          },
          fail(){
          }
        })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
  submit(e){
    const data = e.detail.value
    const app =  getApp();
    const that = this;
    wx.showModal({
      title: '提示',
      content: '确定保存编辑吗？',
      success (res) {
        if (res.confirm) {
          
          console.log('用户点击确定')
          that.setData({
            isdisabled:true
          })
          wx.getStorage({
            key: 'openId',
            success (res) {
              
          const data2= {
              ...data,
              userId:app.globalData.userId,
              noteId:that.data.noteId
            }
            app.put('https://zzc0309.top/api/v2/notes?openid='+res.data,
             data2       
            ).then(res=>{
              console.log(res)
              wx.showToast({
                title: '成功',
                icon: 'success',
                duration: 2000
              })
            }).catch(err=>{
                console.log(err)
            })
            
          
          },
          fail(){
          }
        })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
   
    
    
     
  }
  
  // toothers(e){
  //   wx.navigateTo({
  //     url: '../toOthers/index',
  //     events: { 
  //       // acceptDataFromOpenedPage: function(data) {
  //       // },
        
  //     },
  //     success: function(res) {       
  //       // res.eventChannel.emit('acceptDataFromOpenerPage', { noteId:e.currentTarget.dataset.noteid })
  //     }
  //   })
  // }
})