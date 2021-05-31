// pages/showNote/index.js
import WxValidate from '../../../utils/WxValidate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    tag:'',
    content:'',
    userId:'1',
    isShow:false,
    isdisabled:false,
    array: ['哲学', '经济学', '法学', '文学','历史学','理学','艺术学'],
    index:0,
    info:'',
    imageUrl:'',
    _xkContainer:'_xkContainer2'
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
    const app = getApp();
      this.setData({
                      info:app.globalData.studentinfo
                    })      
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
        maxlength: 500
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
        maxlength:"不可以超过2000个字"
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
  //选择器切换
  bindPickerChange(e){
   console.log(e)
   this.setData({
    index:e.detail.value
   })
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
  //预览图片
  handle_preview:function(){
    wx.previewImage({
      urls: [this.data.imageUrl],
    })
},
//上传图片
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
      console.log(typeof result.data,result.data)
      try{
        var _imageUrl = JSON.parse(result.data)
        // console.log("imageUrl",_imageUrl.data.image_url);
        ctx.setData({
          imageUrl:_imageUrl.data.image_url
        })
      }catch(e){
        console.log(result.statusCode)
        if(result.statusCode===413){
          wx.showModal({
            title: '提示',
            content: '图片太大',
            showCancel: false
          })
        }
        else{
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

  submit(e){
    if(this.formSubmit(e)){
      this.setData({
        isdisabled:true
      })
    const data = e.detail.value
    const app =  getApp();
    const that = this;
    wx.getStorage({
      key: 'openId',
      success (res) {
    const data2= {
        ...data,
        userId:that.data.userId,
        image:that.data.imageUrl,
      }
      app.post('https://zzc0309.top/api/v2/notes?openid='+res.data,
       data2       
      )
      that.setData({
        isShow:true,
        title:'',
        content:'',
      })
      setTimeout(()=> that.setData({
        isShow:false
        }),2000)
      
    },
    fail(){
    }
  })
    }
    
     
  }
  
})