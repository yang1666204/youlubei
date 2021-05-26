// pages/askDetail/index.js
import Toast from "../../miniprogram_npm/vant-weapp/toast/toast";
// require from '../../utils/util.js'
var utils = require("../../../utils/util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { value: "哲学", name: "哲学" },
      { value: "经济学", name: "经济学" },
      { value: "法学", name: "法学" },
      { value: "文学", name: "文学" },
      { value: "历史学", name: "历史学" },
      { value: "理学", name: "理学" },
      { value: "艺术学", name: "艺术学" },
      { value: "工学", name: "工学" },
      { value: "化学", name: "化学" },
    ],
    commentList: [],
    avatar: "",
    content: "",
    created_on: "",
    is_solve: "",
    score: "",
    tag: "",
    title: "",
    user_name: "",
    isShow: false,
    reShow: false,
    radio: "",
    user_id: "",
    inputValue: "",
    openid: "",
    userId: "",
    post_id: "",
    parentId: "",
    is_attention:false,
    is_attention_user:false,
    comment_num:0,
    isShow_foot:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //需要获取收藏状态
    // this.setData({
    //   parentId:options.post_id
    // })
    console.log(options);
    var {post_id} = options
    this.setData({
      post_id : post_id
    })
  
   
      
  },
  handleBack: function (e) {
    wx.navigateBack({
      delta: 1,
    });
  },
  // 提交回复
  handleSubmit: function () {
    let { openid, userId, post_id, inputValue } = this.data;
    const that =this
    wx.request({
      url: "https://zzc0309.top/api/v2/comment?openid=" + openid,
      data: {
        userId: userId,
        parentId: post_id,
        content: inputValue,
      },
      header: { "content-type": "application/json" },
      method: "POST",
      dataType: "json",
      responseType: "text",
      success: (result) => {
        Toast("提交成功");
        this.setData({
          isShow: false,
          isShow_foot:true,
          radio: "",
          inputValue: "",
        });
      },
      fail: () => {},
      complete: () => {
        that.onShow()
      },
    });
  },
  handleres: function () {
    this.setData({
      isShow_foot:false,
      isShow: true,
    });
  },
  getValue: function (e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },
  handleClose: function () {
    this.setData({
      isShow: false,
      isShow_foot:true
    });
  },
  onClose() {
    this.setData({ reShow: false });
  },
  radioChange(e) {
    const items = this.data.items;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value;
    }
    this.setData({
      radio: e.detail.value,
    });

    this.setData({
      items,
    });
  },
  // addTag: function () {
  //   this.setData({
  //     reShow: true,
  //   });
  // },
  //关注人
  
  handlegz:function(){
    var data;
    wx.getStorage({
      key: 'userId',
      success:(res)=>{
        data = res.data
        if(this.data.is_attention_user){
          //点击取消关注
          wx.request({
            url: 'http://zzc0309.top:8000/api/v1/attention_user?openid='+this.data.openid+'&userId='+data.userId+'&userId02='+this.data.user_id,
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
           url: 'http://zzc0309.top:8000/api/v1/attention_user?openid='+this.data.openid+'&userId='+data.userId+'&userId02='+this.data.user_id,
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

  //收藏问题
  handlesc: function () {
    var appInst = getApp();
    if(!this.data.is_attention){
      console.log("aa");
      wx.request({
        // url:"http://zzc0309.top:8000/api/v1/attention?openid=ohOHM5Q_IzgSs7Hdz0iXZ5LEZb9M&userId=1&postId=14",
        url: "http://zzc0309.top:8000/api/v1/attention?openid="+this.data.openid+"&userId="+this.data.user_id+"&postId="+this.data.post_id,
        header: { "content-type": "application/json" },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (result) => {
          console.log(result);
          if(result.data.code === 200){
            wx.showToast({
              title: '收藏成功！',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: false,
              success: (result)=>{
                this.setData({
                  is_attention:true
                })
              },
            });
          }
        },
      });
    }else{
      console.log("b");
      wx.request({
        url: 'http://zzc0309.top:8000/api/v1/attention?openid='+this.data.openid+"&userId="+this.data.user_id+"&postId="+this.data.post_id,
        data: {},
        header: {'content-type':'application/json'},
        method: 'DELETE',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          console.log(result);
          if(result.data.code === 200){
            wx.showToast({
              title: '已取消收藏',
              icon: 'success',
              image: '',
              duration: 1500,
              mask: false,
              success: (result) => {
                this.setData({
                  is_attention:false
                })
              },
            });
              
          }
        },
      });
        
    }
   

  
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var appInst = getApp();
    console.log(appInst.globalData.userId);
    var user_id = appInst.globalData.userId;
    wx.getStorage({
      key: "openId",
      success: (result) => {
        this.setData({
          openid: result.data,
        });
        appInst
          .get("https://zzc0309.top/api/v1/post", {
            openid: result.data,
            postId: this.data.post_id,
            userId: user_id
          })
          .then((res) => {
            console.log(res);
            res.lists.created_on = utils.formatDate( new Date(res.lists.created_on) * 1000)
            console.log(res.lists.created_on);
            this.setData({
              ...res.lists,
            });
            appInst
              .get("https://zzc0309.top/api/v1/comments", {
                openid: this.data.openid,
                parentId: res.lists.post_id,
                // parentId:10
              })
              .then((res) => {
                // var temp = utils.formatTime(Date.parse(new Date())-res.comments[0].created_on)
                for (var i = 0; i < res.comments.length; i++) {
                  // res.comments[i].created_on = utils.formatTime(Date.parse(new Date(res.comments[0].created_on)))
                  res.comments[i].created_on = utils.formatDate(
                    new Date(res.comments[i].created_on) * 1000
                  );
                }
                console.log("res.comments",res.comments);
                this.setData({
                  commentList: res.comments,
                });
              });
          }
          
          );
          
      },
      fail: () => {},
      complete: () => {
        wx.getStorage({
          key: "userId",
          success: (result) => {
            this.setData({
              userId: result.data,
            });
          },
          fail: () => {},
          complete: () => {},
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
