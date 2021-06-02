// app.js
App({
  globalData: {
    userInfo: null,
    //这里暂时忘记是什么作用了
    studentinfo:{},
    //存储个人的信息
    openId:'',

    userId:'',
    isNew_user:false
  },
  onLaunch() {

    //判断是否是新用户
    var _openid = wx.getStorageSync('openId');
    var _userid = wx.getStorageSync('userId');
    if(!_openid && !_userid){
      console.log("新用户");
      this.globalData.isNew_user = true
    }

    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.loadFontFace ({

    //   family: 'PingFangSC-Medium',
    
    //   source: 'url("https://www.your-server.com/PingFangSC-Medium.ttf")',
    
    //   success: function(){console.log('load font success')}
    
    // })
      
    // 登录
    wx.login({
      success: res => {
        var code = res.code// 登录凭证
        wx.request({
          url: 'https://zzc0309.top/wxAuth',
          data: {
            code:code
          },
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            //获取openId,useid全部存缓存中 
            console.log("result",result);  
            wx.setStorage({
              key:"openId",
              data:result.data.data.openid
            })
            this.globalData.openId = result.data.data.openid;
            this.globalData.userId = result.data.data.userId;
            wx.setStorage({
              key:"userId",
              data:result.data.data.userId
            })
          },
          fail: (err) => {
          },
          complete: () => {}
        });
          
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
 
  get(url,data){
   return new Promise((resolve, reject) => {
    wx.request({
      // url:url+'?openid='+res.data.openid+'&tag=理学'+'&page=1',
      url:url,
      data: data,
      header: {'content-type':'application/json'},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        resolve(result.data.data)
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {}
    });   

  })
},
  

  

  post(url,data){
    return new Promise((resolve, reject) => {
    wx.request({
      // url:url+'?openid='+res.data.openid+'&tag=理学'+'&page=1',
      url:url,
      data: data,
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
        console.log(result)
        resolve(result.data.data)
      },
      fail: (err) => {
        reject(err);
      },
      complete: () => {}
    });  
    
   })
  },
  put(url,data){
    return new Promise((resolve, reject) => {
      wx.request({
        // url:url+'?openid='+res.data.openid+'&tag=理学'+'&page=1',
        url:url,
        data: data,
        header: {'content-type':'application/json'},
        method: 'PUT',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          resolve(result)
        },
        fail: (err) => {
          reject(err);
        },
        complete: () => {}
      });   
  
    })
    
  },
  del(url,data){
    return new Promise((resolve, reject) => {
      wx.request({
        // url:url+'?openid='+res.data.openid+'&tag=理学'+'&page=1',
        url:url,
        data: data,
        header: {'content-type':'application/json'},
        method: 'DELETE',
        dataType: 'json',
        responseType: 'text',
        success: (result) => {
          resolve(result)
        },
        fail: (err) => {
          reject(err);
        },
        complete: () => {}
      });   
  
    })
    
  }
})
