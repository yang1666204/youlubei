// pages/changeavatar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    imgs:[],
    isdisabled:false,
    info:''
  },

  chooseImg: function (e) {
    this.setData({
      isdisabled:true
    })
    var that = this;
    var imgs = this.data.imgs;
    if (imgs.length >= 9) {
      this.setData({
        lenMore: 1
      });
      setTimeout(function () {
        that.setData({
          lenMore: 0
        });
      }, 2500);
      return false;
    }
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths + '----');
        var tempFilePaths = res.tempFilePaths;
        var imgs = that.data.imgs;
        
        for (var i = 0; i < tempFilePaths.length; i++) {
          if (imgs.length >= 9) {
            that.setData({
              imgs: imgs
            });
            return false;
          } else {
            imgs.push(tempFilePaths[i]);
          }
        }
        // console.log(imgs);
        that.setData({
          imgs: imgs
        });
      }
    });
  },
  commitImg(){
    var that = this;
    const app = getApp();
    console.log("上传",this.data.imgs[0])
    wx.getStorage({
      key: "openId",
      success(res) {
        console.log(res.data)
        wx.uploadFile({
          url: 'https://zzc0309.top/api/v1/upload?openid='+res.data, //仅为示例，非真实的接口地址
          filePath: that.data.imgs[0],
          name: 'image',
          // formData: {
          //   'image': this.data.imgs[0]
          // },
          success (res){
            console.log(res)
            //do something
            app
            .get("https://zzc0309.top/api/v1/user", {
             openid:app.globalData.openId,
             userId:app.globalData.userId
            })
            .then((res) => {
              console.log(res.list)
              that.setData({
                avatar:res.list.avatar
              })
              app.globalData.studentinfo =  res.list
              //这里再全局获取了个人信息进行了储存
              that.setData({
                info:res.list
              })
              
            })
            .catch((err) => {
            });
          }
        })
      },
      fail() {
      },
      complete() {
        that.onShow()
      },
    });
    
  },
  // 删除图片
  deleteImg: function (e) {
    var imgs = this.data.imgs;
    var index = e.currentTarget.dataset.index;
    imgs.splice(index, 1);
    this.setData({
      imgs: imgs,
      isdisabled:false

    });
  },
  // 预览图片
  previewImg: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var imgs = this.data.imgs;
    wx.previewImage({
      //当前显示图片
      current: imgs[index],
      //所有图片
      urls: imgs
    })
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
    const app = getApp();
    this.setData({
      info:app.globalData.studentinfo
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
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
  afterRead(event) {
    const { file } = event.detail;
    console.log(event)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
  //   wx.uploadFile({
  //     url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
  //     filePath: file.url,
  //     name: 'file',
  //     formData: { user: 'test' },
  //     success(res) {
  //       // 上传完成需要更新 fileList
  //       const { fileList = [] } = this.data;
  //       fileList.push({ ...file, url: res.data });
  //       this.setData({ fileList });
  //     },
  //   });
  },
  showpic(){
    let urls = []
    urls[0] = this.data.info.avatar;
   wx.previewImage({
     urls:  urls  // 需要预览的图片http链接列表
     })
 }
})