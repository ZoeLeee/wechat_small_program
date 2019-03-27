// components/avatar/avatar.js
const app=getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url:String,
    name:String,
    size:String,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  lifetimes:{
    attached(){
      if(!this.data.url){
        this.setData({
          url:app.globalData.profile.avatarUrl,
          name:app.globalData.profile.nickname
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
