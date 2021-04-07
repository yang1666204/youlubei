// pages/askDetail/index.js
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
    ],
    avatar:'',
    content:'',
    create_on:'',
    is_solve:'',
    score:'',
    tag:'',
    title:'',
    user_name:'',
    openid:'',
    isShow:false,
    reShow:false,
    radio:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.openid);
    this.setData({
      openid:options.openid
    })
    var appInst =  getApp();
    
    wx.getStorage({
      key: 'userId',
      success: (result)=>{
        var userId = result.data
        appInst.get('http://zzc0309.top:8000/api/v1/post',{
          openid:options.openid,
          postId:userId
        }).then((res)=>{
          console.log(res);
          this.setData({
            ...res.lists
          })
          console.log(this.data);
        })
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  handleres:function(){
    console.log("点击答复");
    this.setData({
      isShow:true
    })
  },
  handleClose:function(){
    console.log("关闭遮罩层")
    this.setData({
      isShow:false
    })
  },
  onClose() {
    this.setData({ reShow: false });
  },
  radioChange(e) {
    console.log("radio发生change事件，携带value值为：", e.detail.value);

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
  handleBack:function(e){
    console.log("返回");
    wx.navigateBack({
      delta: 1
    });
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