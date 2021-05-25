// component/hisquestion/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    quslist:{
      type:Array,
      value:[],
     
    },
    leftmes:{
      type:String,
      value:''
    },
    rightmes:{
      type:String,
      value:''
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
        console.log("other")
        wx.navigateTo({
          url: '../askDetail/index',
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
          url: '../editques/index',
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
