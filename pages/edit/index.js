// pages/edit/index.js
import WxValidate from '../../utils/WxValidate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    name:'',
    school:'',
    grade:'',
    xueyuan:'',
    studentid:'',
    isShow:false,
    isdisabled:false,
    info:''
    //是否禁用按钮

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate();
    // const app = getApp();
    // this.setData({
    //   info:app.globalData.studentinfo
    // })

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
      info:app.globalData.studentinfo
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false
    })
  },
  
  initValidate() {
    let rules = {
      role: {
        required: true,
      },
      username: {
        required: true,
      },
      school: {
        required: true,

      }, 
      grade: {
        required: true,
        rangelength: [4, 4]
      },
      college: {
        required: true,
      },
      stuid: {
        required: true,
        rangelength: [10, 10]
      }
    }

    let message = {
      role: {
        required: '请输入身份',
        // maxlength: '名字不能超过10个字'
      },
      username: {
        required: "请输入姓名"
      },
      school: {
        required: "请输入学校",
      }
      ,
      grade: {
        required: "请输入年级",
        rangelength: "年级为4位数"
      },
      college: {
        required: "请输入大学",        
      },
      stuid: {
        required: "请输入学号",
        rangelength: "学号为10位数"
      },
    }
    //实例化当前的验证规则和提示消息
    this.WxValidate = new WxValidate(rules, message);
  },
  formSubmit(e) {
    const params =  e.detail.value
    //校验表单
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    return true
  },
  handleClose(){
    this.setData({
      isShow:false
    })
  },
 
  submit(e){
    const that = this
    if(this.formSubmit(e)){
      this.setData({
        isdisabled:true
      })
      const data = e.detail.value
      const app =  getApp();
      const that = this;
      wx.getStorage({
        key: 'openId',
        success (res) {
        app.put('https://zzc0309.top/api/v1/user?openid='+res.data,
         data       
        )
        that.setData({
          isShow:true,
        })
        setTimeout(()=> that.setData({
          isShow:false
          }),2000)
      },
      fail(){
      }
    })
    }      
  },
  goback(){
    wx.navigateBack({
      delta: 1
    })
  },
})