// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    // searchvalue:'',
    // searchsign:false,
    active:0,
    scrollTop:0,
    page:1, 
    floorstatus: false,
    isRefresh:false,
    list:[],
    tag:'哲学',
    openid:'',
    avatar:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const app = getApp();
    const that = this;
    wx.getStorage({
      key: 'openId',
      success (res) {
      that.setData({
        openid:res.data
      })
                    
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

  onTabchange(event) {
    // if(this.data.searchsign){
    //   this.setData({
    //     searchsign:false,
    //   })    
    // }
    const app = getApp();
 
    if(this.data.value!=''){
      //用于判断是否需要发情求
      app.get('https://zzc0309.top/api/v1/notes',{
        openid:this.data.openid,
        tag:event.detail.title,
        page:1,
        title:this.data.value
    }).then(res=>{  
                     this.setData({
                       list: res.lists,
                       tag:event.detail.title,
                       active:event.detail.index,
                       page:1
                     })                                                                                                            
                  }).catch(err=>{
                    
                  })           
  
    }else{
      this.setData({
        list: [],
        page:1 
      })
    }
    
  },
  
  onClick(){ 
    const that = this;
    const app = getApp()
    if(this.data.value!=''){
    app.get('https://zzc0309.top/api/v1/notes',{
      openid:this.data.openid,
      title:this.data.value,
      tag:this.data.tag,
      page:1
  }).then(res=>{
                    console.log(res)
                     that.setData({
                      list: res.lists,
                      page:1 
                    })
                 
                }).catch(err=>{
                 
                }
                )  
   } 
   else{
    that.setData({
      list: [],
      page:1 
    })
  }
  },
  onChange(e){
    this.setData({
       value:e.detail
    })
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
  goTop(e) {  // 一键回到顶部
  
    this.setData({
      scrollTop: 0,
      floorstatus: false
    });
  },
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
  //按需加载
  pushlist(){
    // let title = this.data.searchsign? this.data.searchvalue:'';
    // console.log(title)
    const app = getApp();
    console.log(this.data.page,this.data.tag);
    app.get('https://zzc0309.top/api/v1/notes',{
          // openid:this.data.openid,
          // tag:this.data.tag,
          // page:this.data.page+1,
          // title:this.data.title
          openid:this.data.openid,
          title:this.data.value,
          tag:this.data.tag,
          page:this.data.page+1
          // title:title,
      }).then(res=>{
                           console.log(res)
                          if(this.data.page>res.total/10){
                           
                          }
                           else{
                            this.setData({
                              list: this.data.list.concat(res.lists),
                              page:this.data.page+1
                            })      
                           }   
                                          
                    }).catch(err=>{
                      
                    })           
    
  },
  handlerefresh(e) {
    // let title = this.data.searchsign? this.data.searchvalue:'';
    const that = this;
    const app = getApp();
    console.log(123)
    this.setData({
      isRefresh:true
    })
    if(this.data.value!=''){
    app.get('https://zzc0309.top/api/v1/notes',{
          openid:this.data.openid,
          tag:this.data.tag,
          page:this.data.page,
          title:this.data.value
      }).then(res=>{     
                              let list = this.data.list;
                              list.splice((this.data.page-1)*10,10,) 
                              console.log(list.concat(res.lists))                                                             
                              this.setData({
                                list: list.concat(res.lists),
                              })    
                                                                             
                    }).catch(err=>{                       
                    })
      }
      else{
        this.setData({
          list: [],
        })   
      }
        setTimeout(()=> that.setData({
          isRefresh:false
          }),1500)
  },
  onSearch(){
    const that = this;
    const app = getApp()
    if(this.data.value!=''){
    app.get('https://zzc0309.top/api/v1/notes',{
      openid:this.data.openid,
      title:this.data.value,
      tag:this.data.tag,
      page:1
  }).then(res=>{
                    console.log(res)
                     that.setData({
                      list: res.lists,
                      page:1 
                    })
                 
                }).catch(err=>{
                 
                }
                ) 
  }
  else{
    that.setData({
      list: [],
      page:1 
    })
  }
}

})