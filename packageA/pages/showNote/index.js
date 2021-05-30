
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
     is_myself:false
     
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
      // that.setData({
      //   noteId: data.note_id 
      // })
      wx.getStorage({
        key: 'openId',
        success (res3) {
          app.get('https://zzc0309.top/api/v1/note',{
          userId:app.globalData.userId,
          openid:res3.data,
          noteId:data.noteId,
      }).then(res=>{
                      console.log(res.lists)
                        that.setData({
                          detail: res.lists, 
                          noteId:data.noteId
                        })
                     if(res.lists.user_id===app.globalData.userId){
                      that.setData({
                        is_myself:true
                       })
             }
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
  //预览图片
  handle_preview:function(){
    wx.previewImage({
      urls: [this.data.detail.image],
    })
},
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
  //关注问题
  collect: function () {
    console.log(123)
    var appInst = getApp().globalData;
    if(!this.data.detail.is_attention){
      console.log("aa",appInst.openId+"&userId="+appInst.userId+"&noteId="+this.data.noteId);
      
      wx.request({
        // url:"http://zzc0309.top:8000/api/v1/attention?openid=ohOHM5Q_IzgSs7Hdz0iXZ5LEZb9M&userId=1&postId=14",
        url: "http://zzc0309.top:8000/api/v1/attention_note?openid="+appInst.openId+"&userId="+appInst.userId+"&noteId="+this.data.noteId,
        header: { "content-type": "application/json" },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (result) => {
          console.log(result);
          let attention = "detail.is_attention"
          if(result.data.code === 200){
            wx.showToast({
              title: '收藏成功！',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: false,
              success: (result)=>{
                this.setData({
                  [attention]:true
                })
              },
            });
          }
        },
      });
    }else{
      console.log("b");
      wx.request({
        url: 'http://zzc0309.top:8000/api/v1/attention_note?openid='+appInst.openId+"&userId="+appInst.userId+"&noteId="+this.data.noteId,
        data: {},
        header: {'content-type':'application/json'},
        method: 'DELETE',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          console.log(result);
          let attention = "detail.is_attention"
          if(result.data.code === 200){
            wx.showToast({
              title: '已取消收藏',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                this.setData({
                  [attention]:false
                })
              },
            });
              
          }
        },
      });
        
    } 
  },
//订阅人
  subscribe:function(){
    var data;
    var appInst = getApp().globalData;
    wx.getStorage({
      key: 'userId',
      success:(res)=>{
        data = res.data
        console.log("data",data);
        console.log(this.data.userId);
        if(this.data.detail.is_attention_user== true){
          //点击取消关注
          wx.request({
            url: 'https://zzc0309.top/api/v1/attention_user?openid='+appInst.openId+'&userId='+data+'&userId02='+this.data.detail.user_id,
            data: {},
            header: {'content-type':'application/json'},
            method: 'DELETE',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              console.log(result);
              let attention = "detail.is_attention_user"
              if(result.data.code === 200){
                wx.showToast({
                  title: '已取消',
                  icon:'success',
                  success:()=>{
                    this.setData({
                      [attention]:false
                    })
                  }
                })
              }
            },
          });
        }else{
          //点击关注
         wx.request({
           url: 'https://zzc0309.top/api/v1/attention_user?openid='+appInst.openId+'&userId='+data+'&userId02='+this.data.detail.user_id,
           data: {},
           header: {'content-type':'application/json'},
           method: 'POST',
           dataType: 'json',
           responseType: 'text',
           success: (result) => {
             console.log(result);
             let attention = "detail.is_attention_user"
             if(result.data.code === 200){
               wx.showToast({
                 title: '已关注！',
                 icon:'success',
                 success:()=>{
                   this.setData({
                    [attention]:true
                   })
                 }
               })
             }
           },
         });
           
        }
      }
    })
  },
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