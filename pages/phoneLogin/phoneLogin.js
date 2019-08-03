// pages/phoneLogin/phoneLogin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"手机号",
    type:"phone",
    icon:"icon-phone"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type==="email")
    {
      wx.setNavigationBarTitle({ title: "邮箱登陆" });
      this.setData({
        title: "输入邮箱",
        type: "email",
        icon: "icon-email"
      })
    }
    else
      wx.setNavigationBarTitle({ title: "手机登陆" });
  },
})