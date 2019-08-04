// pages/myMusic/index.js
const {ERequestApi,ERequestStatus}=require('../../utils/enum')
const {req}=require('../../utils/request');

Component({
  data:{
    profile:{},
    buttonTitle: ""
  },
  pageLifetimes: {
    show() {
      const app = getApp();
      if (!app.globalData.isLogin){
        this.setData({buttonTitle:"登陆"});
      }
      else
        this.setData({ buttonTitle: "退出登陆" });
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
      this.setData({
        profile:app.globalData.profile
      })
    },
    hide(){
    }
  },
  methods:{
    async loginOut(){
      const app = getApp();
      if(app.globalData.isLogin)
      {
        let data = await req(ERequestApi.Loginout);
        if (data.code === ERequestStatus.Ok) {
          wx.removeStorageSync('profile');
          getApp().globalData.profile = undefined;
          wx.redirectTo({
            url: "/pages/index/index"
          });
        } 
      }
      else
        wx.redirectTo({
          url: "/pages/login/login"
        });
    }
  }
})