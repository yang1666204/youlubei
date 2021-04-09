// pages/questions/index.js
Page({
  data: {
    value:'',
    active:0,
    scrollTop:0,
    page:[1,0,0,0,0,0,0], 
    floorstatus: false,
    list0:[],
    list1:[],
    list2:[],
    list3:[],
    list4:[],
    list5:[],
    list6:[],
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
    const that = this
    this.getTabBar().init();
    const app = getApp();
    wx.getStorage({
        key: 'openId',
        success (res) {
        that.setData({
          openid:res.data
        })
          app.get('http://47.113.98.212:8000/api/v1/notes',{
          openid:res.data,
          tag:'哲学',
          page:1
      }).then(res=>{
                  
                         that.setData({
                          list0: res.lists 
                        })
                     
                    }).catch(err=>{
                     
                    }
                    )                   
      },
      fail(){
      
      },
      complete(){
     
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
    this.setData({
      tag:event.detail.title,
      active:event.detail.index
    })    
    const app = getApp();
 
    if(this.data.page[event.detail.index]==0){
      app.get('http://47.113.98.212:8000/api/v1/notes',{
        openid:this.data.openid,
        tag:event.detail.title,
        page:this.data.page[event.detail.index]
    }).then(res=>{
                        var pages = "page[" + event.detail.index + "]";
                  
                              if(event.detail.title == "哲学"){
                                this.setData({
                                  list0: this.data.list0.concat(res.lists),
                                  [pages]:this.data.page[event.detail.index]+1
                                })    
                           }else if(event.detail.title == "经济学"){
                            this.setData({
                              list1: this.data.list1.concat(res.lists),
                              [pages]:this.data.page[event.detail.index]+1
                            })    
                           }
                           else if(event.detail.title == "法学"){
                            this.setData({
                              list2: this.data.list2.concat(res.lists),
                              [pages]:this.data.page[event.detail.index]+1
                            })    
                           }else if(event.detail.title == "文学"){
                            this.setData({
                              list3: this.data.list3.concat(res.lists), 
                              [pages]:this.data.page[event.detail.index]+1
                            })    
                           }else if(event.detail.title == "历史学"){
                            this.setData({
                              list4: this.data.list4.concat(res.lists),
                              [pages]:this.data.page[event.detail.index]+1
                            })    
                           }else if(event.detail.title == "理学"){
                            this.setData({
                              list5: this.data.list5.concat(res.lists), 
                              [pages]:this.data.page[event.detail.index]+1
                            })    
                           }else{
                            this.setData({
                              list6: this.data.list6.concat(res.lists),
                              [pages]:this.data.page[event.detail.index]+1
                            })    
                           }
                                        
                  }).catch(err=>{
                    
                  })           
  
    }
    
  },
  toaddnote(){
   
    wx.navigateTo({
      url: '../addNote/index',
      events: {  
      },
      success: function(res) {       
      }
    })
  },
  toshownote(e){
   
    wx.navigateTo({
      url: '../showNote/index',
      events: { 
        acceptDataFromOpenedPage: function(data) {
        
        },
        
      },
      success: function(res) {       
        res.eventChannel.emit('acceptDataFromOpenerPage', { noteId:e.currentTarget.dataset.noteid })
      }
    })
  },
  pushlist(){

    const app = getApp();
  
    app.get('http://47.113.98.212:8000/api/v1/notes',{
          openid:this.data.openid,
          tag:this.data.tag,
          page:this.data.page[this.data.active]+1
      }).then(res=>{
                   
                          if(this.data.page[this.data.active]>res.total/10){
                           
                          }
                           else{
                            var pages = "page[" + this.data.active + "]";
                            if(this.data.tag == "哲学"){                                                                   
                              this.setData({
                                list0: this.data.list0.concat(res.lists),
                                [pages]:this.data.page[this.data.active]+1
                              })    
                         }else if(this.data.tag == "经济学"){
                          var pages = "page[" + this.data.active + "]";
                          this.setData({
                            list1: this.data.list1.concat(res.lists),
                            [pages]:this.data.page[this.data.active]+1 
                          })    
                         }
                         else if(this.data.tag == "法学"){
                          this.setData({
                            list2: this.data.list2.concat(res.lists),
                            [pages]:this.data.page[this.data.active]+1
                          })    
                         }else if(this.data.tag == "文学"){
                          this.setData({
                            list3: this.data.list3.concat(res.lists) ,
                            [pages]:this.data.page[this.data.active]+1
                          })    
                         }else if(this.data.tag == "历史学"){
                          this.setData({
                            list4: this.data.list4.concat(res.lists),
                            [pages]:this.data.page[this.data.active]+1 
                          })    
                         }else if(this.data.tag == "理学"){
                          this.setData({
                            list5:this.data.list5.concat(res.lists) ,
                            [pages]:this.data.page[this.data.active]+1
                          })    
                         }else{
                          this.setData({
                            list6: this.data.list6.concat(res.lists),
                            [pages]:this.data.page[this.data.active]+1 
                          })    
                         }
                           }   
                                          
                    }).catch(err=>{
                      
                    })           
    
  },
  onSearch() {
    // Toast('搜索' + this.data.value);
  },
  onClick() {
    // Toast('搜索' + this.data.value);
  },
})