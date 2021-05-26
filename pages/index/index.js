import { formatDate } from "../../utils/util";
Page({
  // data: {

  // },
  data: {
    isRefresh:false,
    active: 0,
    motto: "youlubei",
    userInfo: {},
    hasUserInfo: false,
    list: [],
    tag: "哲学",
    openid: "",
    date: "",
    imgUrls: [
      "http://icknsd.cn/banner.png",
      "http://icknsd.cn/banner%20%281%29.png",
      "http://icknsd.cn/banner%20%282%29.png",
    ],
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    selectTag:'哲学',
    isRefresh:false,
    page:"1",
    avatar:'',
    user_name:'',
    user_id:0,
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: "../logs/logs",
    });
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true,
      });
    }
    this.getTabBar().init();
    const that = this;
    const app = getApp();
    
    wx.getStorage({
      key: "openId",
      success(res1) {
        that.setData({
          openid: res1.data,
        });
        wx.getStorage({
          key: "userId",
          success(res2) {
                  app
                   .get("https://zzc0309.top/api/v1/posts", {
                     openid: res1.data,
                     tag: "哲学",
                     page: that.data.page,
                   })
                   .then((res) => {
                     for (let i = 0; i < res.lists.length; i++) {
                       res.lists[i].created_on = formatDate(
                         res.lists[i].created_on * 1000
                       );
                     }
                     that.setData({
                       list: res.lists,
                     });
                   })
                   .catch((err) => {
                   });

                   app
                   .get("https://zzc0309.top/api/v1/user", {
                    openid:res1.data,
                    userId:res2.data
                   })
                   .then((res) => {
                     console.log(res.list)
                    //  that.setData({
                    //    avatar:res.list.avatar
                    //  })
                     app.globalData.studentinfo =  res.list
                     //这里再全局获取了个人信息进行了储存
                     that.setData({
                      avatar: res.list.avatar,
                      user_name:res.list.user_name,
                      user_id:res.list.user_id
                    });
                   })
                   .catch((err) => {
                   });
            
          },
          fail() {
          },
          complete() {
          },
        });
      },
      fail() {
      },
      complete() {
      },
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: "展示用户信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        });
      },
    });
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
    });
  },
  onShow: function () {

    const app = getApp();
    this.setData({
      avatar: app.globalData.studentinfo.avatar,
    });
  },
  handleClick() {
    wx.vibrateShort(); 
    wx.navigateTo({
      url: "../../packageC/pages/showQuestions/index",
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        // acceptDataFromOpenedPage: function(data) {
        // },
        // someEvent: function(data) {
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
    this.setData({
      selectTag:event.detail.title
    })
    app
      .get("https://zzc0309.top/api/v1/posts", {
        openid: this.data.openid,
        tag: event.detail.title,
        page: "1",
      })
      .then((res) => {
        for (let i = 0; i < res.lists.length; i++) {
          res.lists[i].created_on = formatDate(res.lists[i].created_on * 1000);
        }
        this.setData({
          list: res.lists,
        });
      })
      .catch((err) => {
      });
  },
  handlerefresh(e) {
    const that = this;
    const app = getApp();
    this.setData({
      isRefresh:true
    })
    app
      .get("https://zzc0309.top/api/v1/posts", {
        openid:this.data.openid,
        tag: this.data.selectTag,
        page: this.data.page,
      })
      .then((res) => {
        for (let i = 0; i < res.lists.length; i++) {
          res.lists[i].created_on = formatDate(res.lists[i].created_on * 1000);
        }
        that.setData({
          list: res.lists,
        });
      })
      .catch((err) => {
      });
      setTimeout(()=> that.setData({
        isRefresh:false
        }),1500)
  },
  loadmore(e){
    const app = getApp();
    app
      .get("https://zzc0309.top/api/v1/posts", {
        openid:this.data.openid,
        tag: this.data.selectTag,
        page: this.data.page+1,
      })
      .then((res) => {
        for (let i = 0; i < res.lists.length; i++) {
          res.lists[i].created_on = formatDate(res.lists[i].created_on * 1000);
        }
        that.setData({
          list:this.data.list.concat(res.lists),
          page:this.data.page+1
        });
      })
      .catch((err) => {
      });
  },
  showpic(){
    let urls = []
    urls[0] = this.data.avatar;
   wx.previewImage({
     urls:  urls  // 需要预览的图片http链接列表
     })
 }
});
