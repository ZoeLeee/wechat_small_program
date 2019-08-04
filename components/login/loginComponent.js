// components/login/loginComponent.js
const { req } = require('../../utils/request');
const {PHONE_REGEXP,EMAIL_REGEXP}=require('../../utils/util');
const {ERequestStatus,ERequestApi}=require('../../utils/enum');

Component({
  /**
   * 组件的属性列表
   */
  options: {
    addGlobalClass: true,
  },
  properties: {
    type: String,
    name: String,
    nameIcon: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    account: "lizhou1021@qq.com",
    pwd: "lz901021",
    isValiAccount:true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async login() {
      const query = {};
      let api="";
      if (this.properties.type === "phone") {
        api=ERequestApi.PhoneLogin;
        query.phone = this.data.account;
      } else {
        api=ERequestApi.EmailLogin;
        query.email = this.data.account;
      }
      query.password = this.data.pwd;
      let data = await req(api, {
        method: "POST",
        data: query
      });
      if(data.code===ERequestStatus.Ok){
        wx.setStorageSync('profile', JSON.stringify(data.profile));
        getApp().globalData.profile=data.profile;
        wx.switchTab({
          url:"/pages/index/index"
        })
      }else{
        wx.showToast({
          title: data.msg,
          icon: 'none',
          duration: 1000
      });
      }
    },
    handleChange(e) {
      if (e.currentTarget.dataset.type === "account"){
        this.setData({
          account: e.detail.value
        });
        if(this.properties.type==="phone"){
          this.setData({
            isValiAccount:PHONE_REGEXP.test(e.detail.value)
          })
        }
        else{
          this.setData({
            isValiAccount:EMAIL_REGEXP.test(e.detail.value)
          })
        }
      }
      else{
        this.setData({
          pwd: e.detail.value
        });
      }
    }
  }
})
