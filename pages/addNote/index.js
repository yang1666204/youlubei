// pages/showNote/index.js
import WxValidate from '../../utils/WxValidate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    tag:'',
    content:'',
    userId:'1',
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
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
    wx.getStorage({
      key: 'userId',
      success (res) {
      that.setData({
        userId: res.data 
      })
    },
    fail(){
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
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false
    })
  },
  
  initValidate() {
    let rules = {
      title: {
        required: true,
      },
      tag: {
        required: true,
      },
      content: {
        required: true,
        maxlength: 100
      }, 
    }

    let message = {
      title: {
        required: '请输入题目',
        // maxlength: '名字不能超过10个字'
      },
      tag: {
        required: "请输入学科"
      },
      content: {
        required: "请输入笔记",
        maxlength:"不可以超过100个字"
      }  
    }
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },
  formSubmit(e) {
    const params =  e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    return true
  },
 
  handleClose(){
    this.setData({
      isShow:false
    })
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
  submit(e){
    if(this.formSubmit(e)){
    const data = e.detail.value
    const app =  getApp();
    const that = this;
    wx.getStorage({
      key: 'openId',
      success (res) {
    const data2= {
        ...data,
        userId:that.data.userId
      }
      app.post('http://47.113.98.212:8000/api/v1/notes?openid='+res.data,
       data2       
      )
      that.setData({
        isShow:true
      })
    },
    fail(){
    }
  })
    }
    
     
  }
  
})