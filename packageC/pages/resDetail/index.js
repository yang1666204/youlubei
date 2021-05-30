// pages/resDetail/index.js
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
    imageUrl:'',
    is_attention_user:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      ...options
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
        console.log(openId);
        if(this.data.is_attention_user== true){
          //点击取消关注
          wx.request({
            url: 'http://zzc0309.top:8000/api/v1/attention_user?openid='+openId+'&userId='+data+'&userId02='+this.data.user_id,
            data: {},
            header: {'content-type':'application/json'},
            method: 'DELETE',
            dataType: 'json',
            responseType: 'text',
            success: (result) => {
              console.log(result);
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
           url: 'http://zzc0309.top:8000/api/v1/attention_user?openid='+openId+'&userId='+data+'&userId02='+this.data.user_id,
           data: {},
           header: {'content-type':'application/json'},
           method: 'POST',
           dataType: 'json',
           responseType: 'text',
           success: (result) => {
             console.log(result);
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

  }
})