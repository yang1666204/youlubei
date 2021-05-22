// component/hisnote/index.js
Component({
  /**
   * 组件的属性列表
   */
   properties: {
    notelist:{
      type:Array,
      value:[]
    },
    sign:{
      type:String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    toshownote(e){
   
      if(this.properties.sign=='other'){
        wx.navigateTo({
          url: '../showNote/index',
          events: { 
            acceptDataFromOpenedPage: function(data) {
            
            },
            
          },
          success: function(res) {       
            res.eventChannel.emit('acceptDataFromOpenerPage', { 
              noteId:e.currentTarget.dataset.noteid,
             
            })
          }
        })
      }else{
        wx.navigateTo({
          url: '../modify/index',
          events: { 
            acceptDataFromOpenedPage: function(data) {
            
            },
            
          },
          success: function(res) {       
            res.eventChannel.emit('acceptDataFromOpenerPage', { 
              noteId:e.currentTarget.dataset.noteid,
             
            })
          }
        })
      }
     
    },
  }
})
