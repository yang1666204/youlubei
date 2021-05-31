// pages/showQuestions/index.js
import WxValidate from "../../../utils/WxValidate";


Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:'',
    info:'',
    userId: "",
    openid: "",
    show: false,
    isShow: false,
    title: "",
    tag: "",
    content: "",
    xkList:[
      '哲学',
      '经济学',
      '法学',
      '文学',
      '历史学',
      '理学',
      '艺术学'
    ],
    index:0,
    _xkContainer:'_xkContainer'
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
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const app = getApp();
      this.setData({
                      info:app.globalData.studentinfo
                    })      
    wx.getStorage({
      key: "openId",
      success: (result) => {
        this.setData({
          openid: result.data,
        });
        wx.getStorage({
          key: "userId",
          success: (result) => {
            this.setData({
              userId: result.data,
            });
          },
        });
      },
    });
  },
  //学科改变
  xkChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },

  //拍照上传
  handlePhoto:function(){
    console.log("点击上传图片");
    var that = this,temp_url
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var tempFilePaths = res.tempFilePaths;
        this.upload(that,tempFilePaths)
      },
      fail: () => {},
      complete: () => {}
    });
      
  },

  upload:function(ctx,url){
    var openId = wx.getStorageSync('openId');
    console.log(openId);
    wx.showToast({
      title: '正在上传',
      icon: 'loading'
    });
    console.log(openId,url[0]);
    wx.uploadFile({
      url: 'https://zzc0309.top/api/v1/upload?openid='+openId+'&isAvatar=0',
      filePath: url[0],
      name: 'image',
      success: (result)=>{
        //JSON.parse 字符串转JSON
        try{
          var _imageUrl = JSON.parse(result.data)
          console.log("imageUrl",_imageUrl.data.image_url);
          ctx.setData({
            imageUrl:_imageUrl.data.image_url
          })
        }catch(e){
          console.log(result);
          if(result.statusCode === 413){
            wx.showModal({
              title: '提示',
              content: '图片太大',
              showCancel: false
            })
          }else{
            wx.showModal({
              title: '提示',
              content: '上传失败',
              showCancel: false
            })
          }
        }
      },
      fail: ()=>{
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: ()=>{
        wx.hideToast();
      }
    });
  },

  handleClose: function (e) {
    this.setData({
      isShow: false,
    });
  },
  handleSubmit: function (e) {
    console.log(e);
    if (this.formSubmit(e)) {
      const that = this;
      const app = getApp();
      let { value } = e.detail;
      console.log("value",value);
      wx.request({
        url: "https://zzc0309.top/api/v2/posts?openid="+this.data.openid,
        data: {
          ...value,
          image:this.data.imageUrl,
          userId: this.data.userId,
        },
        header: { "content-type": "application/json" },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (result) => {
          console.log(result);
          this.setData({
            isShow: true,
            title: "",
            content: "",
          });
        }
      });
    }
  },
  handleBack: function (e) {
    wx.navigateBack({
      delta: 1,
    });
  },
  addTag: function () {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  handleSelect(event) {
    this.setData({
      radio: event.detail,
    });
  },
  // 表单验证
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    });
  },

  initValidate() {
    let rules = {
      title: {
        required: true,
      },
      content: {
        required: true,
        maxlength: 2000,
      },
      tag:{
        required:true
      },
    };

    let message = {
      title: {
        required: "请输入题目",
        // maxlength: '名字不能超过10个字'
      },
      tag:{
        required:"请输入学科"
      },
      content: {
        required: "请写下你的提问",
        maxlength: "不可以超过2000个字",
      },
    };
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },
  formSubmit(e) {
    const params = e.detail.value;
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    return true;
  },
  
  handle_preview:function(){
    wx.previewImage({
      urls: [this.data.imageUrl],
    })
}
});

