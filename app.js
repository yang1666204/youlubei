// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        var code = res.code// 登录凭证
        console.log(code);
        wx.request({
          url: 'http://8.129.112.196:8000/wxAuth',
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
              data:result.data.data
            })
            console.log(result);
            console.log(result.data.data.openid);
            let {openid}=result.data.data
            wx.setStorageSync({
              key:"openid",
              data:openid
            })
          },
          fail: (err) => {
            console.log(err);
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
        console.log(result,result.data.data.lists);
        resolve(result.data.data.lists)
      },
      fail: (err) => {
        console.log(err);
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
        console.log(result);
      },
      fail: (err) => {
        console.log(err);
      },
      complete: () => {}
    });   
  }
})
