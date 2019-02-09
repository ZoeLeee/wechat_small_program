// pages/myMusic/index.js
const {ERequestApi,ERequestStatus}=require('../../utils/enum')
const {req}=require('../../utils/request');

Component({
  data:{
    profile:{}
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
      let app=getApp();
      this.setData({
        profile:app.globalData.profile
      })
    },
    hide(){
    }
  },
  methods:{
    async loginOut(){
      let {data}= await req(ERequestApi.Loginout);
      if(data.code===ERequestStatus.Ok){
        wx.removeStorageSync('profile');
        getApp().globalData.profile=undefined;
        wx.redirectTo({
          url:"/pages/login/login"
        })
      } 
    }
  }
})