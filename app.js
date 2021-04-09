// app.js
App({
  onLaunch() {
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
          url: 'http://47.113.98.212:8000/wxAuth',
          data: {
            code:code
          },
          header: {'content-type':'application/json'},
          method: 'GET',
          dataType: 'json',
          responseType: 'text',
          success: (result) => {
            //获取openId,存缓存中   
            wx.setStorage({
              key:"openId",
              data:result.data.data.openid
            })
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
  globalData: {
    userInfo: null
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
    wx.request({
      // url:url+'?openid='+res.data.openid+'&tag=理学'+'&page=1',
      url:url,
      data: data,
      header: {'content-type':'application/json'},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
      },
      fail: (err) => {
      },
      complete: () => {}
    });   
  },
  put(url,data){
    wx.request({
      // url:url+'?openid='+res.data.openid+'&tag=理学'+'&page=1',
      url:url,
      data: data,
      header: {'content-type':'application/json'},
      method: 'PUT',
      dataType: 'json',
      responseType: 'text',
      success: (result) => {
      },
      fail: (err) => {
      },
      complete: () => {}
    });   
  }
})
