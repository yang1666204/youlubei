// pages/questions/index.js
Page({
  data: {
    value:'',
    active:0,
    scrollTop:0,
    floorstatus: false,
    list:[],
    tag:'哲学',
    openid:''
  },
  /**
   * 页面的初始数据
   */

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
    console.log('笔记页');
    this.getTabBar().init();
    const app = getApp();
    this.setData({
      active: 0,
    });
    wx.getStorage({
        key: 'openId',
        success (res) {
        console.log(res.data);
        that.setData({
          openid:res.data
        })
          app.get('http://zzc0309.top:8000/api/v1/notes',{
          openid:res.data,
          tag:"哲学",
          page:"1"
      }).then(res=>{
                        console.log('111', res );
                         that.setData({
                          list: res.lists 
                        })
                     
                    }).catch(err=>{
                        console.log('222',err )
                    }
                    )                   
      },
      fail(){
        console.log("失败")
      },
      complete(){
        // console.log(a)
      }
    })
    // console(a)
    
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.getTabBar().jump();
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // this.getTabBar().jump();
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
  // method{}
  scrolltoupper(e){
    if (e.detail.scrollTop > 100) {
      this.setData({
        floorstatus: true
      });
    } else {
      this.setData({
        floorstatus: false
      });
    }
  },
  goTop(e) {  // 一键回到顶部
    console.log(e)
    this.setData({
      scrollTop: 0,
      floorstatus: false
    });
  },
  onChange(e) {
    this.setData({
      value: e.detail,
    });

  },
  onTabchange(event) {
    const app = getApp();
    console.log(event.detail.title,this.data.openid)
    app.get('http://zzc0309.top:8000/api/v1/notes',{
          openid:this.data.openid,
          tag:event.detail.title,
          page:"1"
      }).then(res=>{
                        console.log('111',res);
                         this.setData({
                          list: res.lists 
                        })                     
                    }).catch(err=>{
                        console.log('222',err )
                    })           
    
  },
  toaddnote(){
    console.log('11')
    wx.navigateTo({
      url: '../addNote/index',
      events: {  
      },
      success: function(res) {       
      }
    })
  },
  toshownote(e){
    console.log(e.currentTarget.dataset.noteid);
    wx.navigateTo({
      url: '../showNote/index',
      events: { 
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        
      },
      success: function(res) {       
        res.eventChannel.emit('acceptDataFromOpenerPage', { noteId:e.currentTarget.dataset.noteid })
      }
    })
  },
  onSearch() {
    // Toast('搜索' + this.data.value);
  },
  onClick() {
    // Toast('搜索' + this.data.value);
  },
})