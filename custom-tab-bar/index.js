Component({
  data: {
     // 选中的 tab 
    active: 0,
    // 菜单列表
    list: [{
        "url": "/pages/index/index",//地址
        "icon": "wap-home-o",//图标
        "info": '',//小红点
        "text": "首页"
      },
      {
        "url": "/pages/note/index",
        "icon": "chat-o",
        "info": '',
        "text": "笔记"
      },
      {
        "url": "/pages/person/index",
        "icon": "user-o",
        "info": '3',
        "text": "我的"
      }
    ]
  },
  methods: {
    // jump(){
    //   console.log('haha')
    //   this.setData({
    //     active: 1
    //   });
    // },
    onChange(e) {
      // console.log(e, 'e')
      this.setData({
        active: e.detail
      });
      wx.switchTab({
        url: this.data.list[e.detail].url
      });
    },
    init() {
      const page = getCurrentPages().pop();
      console.log(page.route)
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
    }
  }
});
 
// console.log('首页')
// this.getTabBar().init();