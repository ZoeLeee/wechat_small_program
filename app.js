//app.js

const {req}=require('./utils/request.js');
const { ERequestApi, ERequestStatus}=require('./utils/enum.js');

App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
      }
    })
  },
  globalData: {
    userInfo: null,
    isLogin:false,
    profile:undefined,
    innerAudioContext:wx.createInnerAudioContext(),
    musicList:[],
    songs:undefined,
    musicListType:"",
    lastMusicListType:"",
    songs:[],
  }
})