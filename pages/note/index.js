// pages/questions/index.js
Page({
  data: {
    value:'',
    searchvalue:'',
    searchsign:false,
    active:0,
    scrollTop:0,
    page:[1,0,0,0,0,0,0], 
    floorstatus: false,
    isRefresh:false,
    list0:[],
    list1:[],
    list2:[],
    list3:[],
    list4:[],
    list5:[],
    list6:[],
    tag:'哲学',
    openid:'',
    avatar:''
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
    this.setData({
      avatar:app.globalData.studentinfo.avatar
    })
    wx.getStorage({
        key: 'openId',
        success (res) {
        that.setData({
          openid:res.data
        })
          app.get('https://zzc0309.top/api/v1/notes',{
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
    const app = getApp();
    this.setData({
      avatar: app.globalData.studentinfo.avatar,
    });
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
  //一键返回顶部是否显示
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
  //下拉刷新这个逻辑需要改善
  handlerefresh(e) {
    let title = this.data.searchsign? this.data.searchvalue:'';
    const that = this;
    const app = getApp();
    console.log(123)
    this.setData({
      isRefresh:true
    })
    app.get('https://zzc0309.top/api/v1/notes',{
          openid:this.data.openid,
          tag:this.data.tag,
          page:this.data.page[this.data.active],
          title:title
      }).then(res=>{
                                                       
                            if(this.data.tag == "哲学"){     
                              let list0 = this.data.list0;
                              list0.splice((this.data.page[this.data.active]-1)*10,10,) 
                              console.log(list0.concat(res.lists))                                                             
                              this.setData({
                                list0: list0.concat(res.lists),
                              })    
                         }else if(this.data.tag == "经济学"){
                          let list1 = this.data.list1;
                          list1.splice((this.data.page[this.data.active]-1)*10,10,) 
                          this.setData({
                            list1: list1.concat(res.lists),
                          })    
                         }
                         else if(this.data.tag == "法学"){
                          let list2 = this.data.list2;
                          list2.splice((this.data.page[this.data.active]-1)*10,10,) 
                          this.setData({
                            list2: list2.concat(res.lists),
                          })    
                         }else if(this.data.tag == "文学"){
                          let list3 = this.data.list3;
                          list3.splice((this.data.page[this.data.active]-1)*10,10,)
                          this.setData({
                            list3: list3.concat(res.lists),
                          })    
                         }else if(this.data.tag == "历史学"){
                          let list4 = this.data.list4;
                          list4.splice((this.data.page[this.data.active]-1)*10,10,)
                          this.setData({
                            list4: list4.concat(res.lists), 
                          })    
                         }else if(this.data.tag == "理学"){
                          let list5 = this.data.list5;
                          list5.splice((this.data.page[this.data.active]-1)*10,10,)
                          this.setData({
                            list5:list5.concat(res.lists),
                          })    
                         }else{
                          let list6 = this.data.list6;
                          list6.splice((this.data.page[this.data.active]-1)*10,10,)
                          this.setData({
                            list6: list6.concat(res.lists),
                          })    
                         }
                              
                            
                    }).catch(err=>{
                        
                    })
        setTimeout(()=> that.setData({
          isRefresh:false
          }),1500)
  },
  onChange(e) {
    this.setData({
      value: e.detail,
      searchvalue:e.detail
    });

  },
  //科目直接转换的函数
  onTabchange(event) {
    if(this.data.searchsign){
      this.setData({
        searchsign:false,
      })    
    }
    this.setData({
      tag:event.detail.title,
      active:event.detail.index
    })    
    const app = getApp();
 
    if(this.data.page[event.detail.index]==0){
      //用于判断是否需要发情求
      app.get('https://zzc0309.top/api/v1/notes',{
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
//页面跳转
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
  // 按需加载函数
  pushlist(){
    let title = this.data.searchsign? this.data.searchvalue:'';
    console.log(title)
    const app = getApp();
    console.log(this.data.page[this.data.active]);
    app.get('https://zzc0309.top/api/v1/notes',{
          openid:this.data.openid,
          tag:this.data.tag,
          page:this.data.page[this.data.active]+1,
          title:title,
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
  onSearch(e) {
    // Toast('搜索' + this.data.value);
    // console.log(e)
  },
  onClick(e) {
    // Toast('搜索' + this.data.value);
    console.log(this.data.value)
    const app = getApp();
        app.get('https://zzc0309.top/api/v1/notes',{
        openid:this.data.openid,
        tag:this.data.tag,
        page:1,
        title:this.data.value
    }).then(res=>{
                       var pages = "page[" + this.data.active + "]";   
                       var list = "list"+this.data.active     
                       console.log(list)                                           
                       this.setData({
                        [list]: res.lists,
                        [pages]:1,
                        value: '' ,
                        searchsign:true
                      })
                   console.log(res.lists);
                  }).catch(err=>{                   
                  })                   
  },
  cancel(e){
    console.log(e);
    // this.onLoad()
    const app = getApp();
        app.get('https://zzc0309.top/api/v1/notes',{
        openid:this.data.openid,
        tag:this.data.tag,
        page:1,
    }).then(res=>{
                       var pages = "page[" + this.data.active + "]";   
                       var list = "list"+this.data.active     
                       console.log(list)                                           
                       this.setData({
                        [list]: res.lists,
                        [pages]:1,
                        value: '' ,
                        searchsign:false
                      })
                   console.log(res.lists);
                  }).catch(err=>{                   
                  }) 
  }
})