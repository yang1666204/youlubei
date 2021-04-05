// // index.js
// // 获取应用实例
// const app = getApp()

// Page({
//   data: {
//     motto: 'youlubei',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo'),
//     canIUseGetUserProfile: false,
//     canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
//   },
//   // 事件处理函数
//   bindViewTap() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad() {
//     if (wx.getUserProfile) {
//       this.setData({
//         canIUseGetUserProfile: true
//       })
//     }
//   },
//   getUserProfile(e) {
//     // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
//     wx.getUserProfile({
//       desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
//       success: (res) => {
//         console.log(res)
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     })
//   },
//   getUserInfo(e) {
//     // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
//     console.log(e)
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
var util = require('../../utils/util.js')
Page({
  // data: {

  // },
  data: {
    active: 0,
    motto: "youlubei",
    userInfo: {},
    imgUrls: [
      "http://qq41fqbou.hn-bkt.clouddn.com/banner.png",
      "http://qq41fqbou.hn-bkt.clouddn.com/banner%20%281%29.png",
      "http://qq41fqbou.hn-bkt.clouddn.com/banner%20%282%29.png",
    ],
    hasUserInfo: false,
    list: [],
    tag: "哲学",
    openid: "",
    date:'',
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    console.log(formatTime(Date));
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e);
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  onUnload() {
    clearInterval(this.timer)
  },
  onShow: function () {
    var Time = util.formatDate(new Date())
    console.log(Time);
    this.getTabBar().init();
    const that = this;
    const app = getApp();

    wx.getStorage({
      key: "openId",
      success(res) {
        console.log(res.data);
        that.setData({
          openid: res.data,
        });
        app
          .get("http://zzc0309.top:8000/api/v1/posts", {
            openid: res.data,
            tag: "哲学",
            page: "1",
          })
          .then((res) => {
            console.log("111", res);
            that.setData({
              list: res,
            });
          })
          .catch((err) => {
            console.log("222", err);
          });
      },
      fail() {
        console.log("失败");
      },
      complete() {
        // console.log(a)
      },
    });
  },
  handleClick() {
    wx.navigateTo({
      url: "../showQuestions/index",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        // acceptDataFromOpenedPage: function(data) {
        //   console.log(data)
        // },
        // someEvent: function(data) {
        //   console.log(data)
        // }
      },
      success: function (res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      },
    });
  },
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({ active: event.detail });
  },
  onTabchange(event) {
    const app = getApp();
    console.log(event.detail.title, this.data.openid);
    app
      .get("http://zzc0309.top:8000/api/v1/posts", {
        openid: this.data.openid,
        tag: event.detail.title,
        page: "1",
      })
      .then((res) => {
        console.log("111", res);
        this.setData({
          list: res,
        });
      })
      .catch((err) => {
        console.log("222", err);
      });
  },
});
