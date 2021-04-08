// pages/showQuestions/index.js
import WxValidate from "../../utils/WxValidate";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userId: "",
    openid: "",
    show: false,
    radio: "",
    items: [
      { value: "哲学", name: "哲学" },
      { value: "经济学", name: "经济学" },
      { value: "法学", name: "法学" },
      { value: "文学", name: "文学" },
      { value: "历史学", name: "历史学" },
      { value: "理学", name: "理学" },
     
      { value: "工学", name: "工学" },
      { value: "艺术学", name: "艺术学" },
    ],
    isShow: false,
    title: "",
    xueke: "",
    content: "",
    jifen: 10,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
  },

  onChange(event) {
    console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("增加提问");
    console.log(this.data.radio);
    wx.getStorage({
      key: "openId",
      success: (result) => {
        console.log("a");
        console.log(result);
        this.setData({
          openid: result.data,
        });
        wx.getStorage({
          key: "userId",
          success: (result) => {
            this.setData({
              userId: result.data,
            });
            console.log(result);
          },
        });
      },
    });
  },
  handleClose: function (e) {
    this.setData({
      isShow: false,
    });
  },
  handleSubmit: function (e) {
    if (this.formSubmit(e)) {
      const that = this;
      const app = getApp();
      let { value } = e.detail;
      console.log( value);
      if(!value.tag){
        wx.showModal({
          content: '请选择标签',
          showCancel: false,
        });
        return
      }
      console.log(e);
      //接口没用学科这个参数  把tag代替的学科
      delete value.xueke
      console.log(value);
      wx.request({
        url: "http://47.113.98.212:8000/api/v1/posts?openid="+this.data.openid,
        data: {
          ...value,
          userId: this.data.userId,
        },
        header: { "content-type": "application/json" },
        method: "POST",
        dataType: "json",
        responseType: "text",
        success: (result) => {
          console.log(result);
          this.setData({
            isShow: true,
            title: "",
            xueke: "",
            content: "",
            jifen: 10,
            radio: "",
          });
        },
        fail: () => {
          console.log("a");
        },
        complete: () => {
          console.log("b");
        },
      });
    }
  },
  handleBack: function (e) {
    console.log("返回");
    wx.navigateBack({
      delta: 1,
    });
  },
  addTag: function () {
    this.setData({
      show: true,
    });
  },
  onClose() {
    this.setData({ show: false });
  },
  handleSelect(event) {
    console.log(event.detail);
    this.setData({
      radio: event.detail,
    });
  },
  radioChange(e) {
    console.log("radio发生change事件，携带value值为：", e.detail.value);

    const items = this.data.items;
    for (let i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value === e.detail.value;
    }
    console.log(e.detail.value,);
    this.setData({
      radio: e.detail.value,
    });

    this.setData({
      items,
    });
  },
  // 表单验证
  showModal(error) {
    console.log(error);
    wx.showModal({
      content: error.msg,
      showCancel: false,
    });
  },

  initValidate() {
    let rules = {
      title: {
        required: true,
      },
      content: {
        required: true,
        maxlength: 100,
      },
      xueke:{
        required:true
      },
    };

    let message = {
      title: {
        required: "请输入题目",
        // maxlength: '名字不能超过10个字'
      },
      xueke:{
        required:"请输入学科"
      },
      content: {
        required: "请写下你的提问",
        maxlength: "不可以超过100个字",
      },
    };
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },
  formSubmit(e) {
    const params = e.detail.value;
    console.log(this.WxValidate, "params");
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0];
      this.showModal(error);
      return false;
    }
    return true;
  },
});
