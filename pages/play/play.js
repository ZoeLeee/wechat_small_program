// pages/play/play.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus } = require('../../utils/enum');

const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  innerAudioContext:null,
  data: {
    playing:false,
    backgroundImg:"",
    percent:0,
    playedTime:0,
    totalTime:0,
    totalTimeStr:"",
    playerTimeStr:"00:00",
    draging:false,
  },
  async play(sid){
    let {data}=await req(ERequestApi.Play,{
      data:{id:sid}
    })
    if(data.code===ERequestStatus.Ok&&data.data.length>0){
      if(!data.data[0].url){
        wx.navigateBack({
          delta:1
        })
        return;
      }
      this.innerAudioContext = app.globalData.innerAudioContext;
      this.innerAudioContext.autoplay = true
      this.innerAudioContext.src =data.data[0].url;
      let res = await req(ERequestApi.Song,{
        data:{ids:sid}
      })
      if (res.data.code === ERequestStatus.Ok){
        let song=res.data.songs[0];
        let pic=song.al.picUrl;
        this.setData({
          backgroundImg: pic,
          totalTime: song.dt,
          totalTimeStr: this.convertTimeToStr(song.dt),
          playing:true,
        })
        wx.setNavigationBarTitle({
          title: song.name,
        });
      }
      this.registerEvent();
    }
  },
  onTimeUpdate() {
    if(this.data.draging) return;
    let currentTime = this.innerAudioContext.currentTime*1000;
    this.setData({
      playedTime: currentTime,
      playerTimeStr: this.convertTimeToStr(currentTime),
      percent: Math.floor(currentTime / this.data.totalTime * 100)
    })
  },
  registerEvent(){
    this.innerAudioContext.onPlay(()=>{
      this.innerAudioContext.onTimeUpdate(this.onTimeUpdate);
    })
  },
  removeEvent(){
    this.innerAudioContext.offTimeUpdate(this.onTimeUpdate);
  },
  convertTimeToStr(time) {
    let m = "0" + Math.floor(time/1000 / 60);
    let s =Math.floor((time/1000) % 60);
    s = s < 10 ? "0" + s : s + "";
    return m + ":" + s;
  },
  handleMusic() {
    if (this.data.playing) {
      this.innerAudioContext.pause();
    }
    else {
      this.innerAudioContext.play();
    }

    this.setData({ playing: !this.data.playing });
  },
  handleChanged(e){
    let curVal=e.detail.value;
    let self=this;
    this.innerAudioContext.seek(curVal/1000);
    this.innerAudioContext.onSeeked(res=>{
      this.setData({ draging: false });
      self.onTimeUpdate();
    });
  },
  handleChangeing(e){
    this.setData({draging:true});
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
    if (this.innerAudioContext){
      // this.innerAudioContext.stop();
      // this.setData({playing:false});
    }
  },
})