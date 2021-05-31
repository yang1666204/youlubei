// pages/resDetail/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatar:'',
    content:'',
    created_on:'',
    title:"",
    user_id:'',//被访问的用户
    user_name:'',
    imageUrl:'',//不使用了 
    is_attention_user:false,
    image:'',
    is_myself:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      ...options,
      image:options.imageUrl
    })
  },

  //关注
 
  handlegz:function(){
    var data;
    wx.getStorage({
      key: 'userId',
      success:(res)=>{
        data = res.data
        var openId = wx.getStorageSync('openId')
        if(this.data.is_attention_user== true){
          //点击取消关注
          wx.request({
            url: 'https://zzc0309.top/api/v1/attention_user?openid='+openId+'&userId='+data+'&userId02='+this.data.user_id,
            data: {},
            header: {'content-type':'application/json'},
            method: 'DELETE',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              if(result.data.code === 200){
                wx.showToast({
                  title: '已取消',
                  icon:'success',
                  success:()=>{
                    this.setData({
                      is_attention_user:false
                    })
                  }
                })
              }
            },
          });
        }else{
          //点击关注
         wx.request({
           url: 'https://zzc0309.top/api/v1/attention_user?openid='+openId+'&userId='+data+'&userId02='+this.data.user_id,
           data: {},
           header: {'content-type':'application/json'},
           method: 'POST',
           dataType: 'json',
           responseType: 'text',
           success: (result) => {
             if(result.data.code === 200){
               wx.showToast({
                 title: '已关注！',
                 icon:'success',
                 success:()=>{
                   this.setData({
                     is_attention_user:true
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

  onShow: function () {
    var openid = wx.getStorageSync('openId')
    var myuser_id = wx.getStorageSync('userId')
    app.get("https://zzc0309.top/api/v1/attention_user",{
      openid,
      userId:myuser_id,
      userId02:this.data.user_id
    }).then((res)=>{
      if(myuser_id == this.data.user_id){
        //不能自己关注自己
        this.setData({
          is_myself:true
        })
      }
      for(let i = 0;i<res.total;i++){
        if(this.data.user_id == res.lists[i].user_id){
          //关注用户中存在这个人
          this.setData({
            is_attention_user:true
          })
          return
        }
      }
    })
  },

  handle_preview:function(){
    wx.previewImage({
      urls: [this.data.image],
    })
},
})