// pages/play/play.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus } = require('../../utils/enum');

Page({

  /**
   * 页面的初始数据
   */
  innerAudioContext:null,
  data: {

  },
  async play(sid){
    let {data}=await req(ERequestApi.Play,{
      data:{id:sid}
    })
    if(data.code===ERequestStatus.Ok&&data.data.length>0){
      if(!data.data[0].url){
        wx.navigaterBack();
        return;
      }
      this.innerAudioContext=wx.createInnerAudioContext();
      this.innerAudioContext.autoplay = true
      this.innerAudioContext.src =data.data[0].url;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid=options.sid;
    if(sid!==undefined)
      this.play(sid);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.innerAudioContext.stop()
    this.innerAudioContext.destory();
  },
})