// pages/askDetail/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
// require from '../../utils/util.js'
var utils = require('../../utils/util.js')
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
      {value:"化学",name:'化学'}
    ],
    commentList:[],
    avatar:'',
    content:'',
    create_on:'',
    is_solve:'',
    score:'',
    tag:'',
    title:'',
    user_name:'',
    isShow:false,
    reShow:false,
    radio:'',
    user_id:'',
    inputValue:'',
    openid:'',
    userId:'',
    post_id:'',
    parentId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   parentId:options.post_id
    // })
    var appInst =  getApp();
    
    wx.getStorage({
      key: 'openId',
      success: (result)=>{
        this.setData({
          openid:result.data
        })
        appInst.get('http://47.113.98.212:8000/api/v1/post',{
          openid:result.data,
          postId:options.post_id
        }).then((res)=>{
          this.setData({
            ...res.lists
          })
          appInst.get('http://47.113.98.212:8000/api/v1/comments',{
            openid:this.data.openid,
            parentId:res.lists.post_id
            // parentId:10
          }).then((res)=>{
            // var temp = utils.formatTime(Date.parse(new Date())-res.comments[0].created_on)
            for(var i = 0;i<res.comments.length;i++){
              // res.comments[i].created_on = utils.formatTime(Date.parse(new Date(res.comments[0].created_on)))
              res.comments[i].created_on = utils.formatDate(new Date(res.comments[i].created_on)*1000)
            }
            this.setData({
              commentList:res.comments
            })
          })
        })
      },
      fail: ()=>{},
      complete: ()=>{
        wx.getStorage({
          key: 'userId',
          success: (result)=>{
            this.setData({
              userId:result.data
            })
          },
          fail: ()=>{},
          complete: ()=>{
           
          }
        });
       
      }
    });
   
  },
  handleBack:function(e){
    wx.navigateBack({
      delta: 1
    });
  },
  // 提交回复
  handleSubmit:function(){
    let {openid,userId,post_id,inputValue} = this.data
    wx.request({
      url: 'http://47.113.98.212:8000/api/v1/comment?openid='+openid,
      data: {
        userId:userId,
        parentId:post_id,
        content:inputValue
      },
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        Toast('提交成功');
        this.setData({
          isShow:false,
          radio:'',
          inputValue:''
        })
      },
      fail: () => {
      },
      complete: () => {
      }
    });
      
  },
  handleres:function(){
    this.setData({
      isShow:true
    })
  },
  getValue:function(e){
    this.setData({
      inputValue:e.detail.value
    })
  },
  handleClose:function(){
    this.setData({
      isShow:false
    })
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
  addTag: function () {
    this.setData({
      reShow: true,
    });
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