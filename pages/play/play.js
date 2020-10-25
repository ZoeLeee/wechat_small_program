// pages/play/play.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus } = require('../../utils/enum');

const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  innerAudioContext:  app.globalData.innerAudioContext,
  disvailCount: 0,
  data: {
    playing: false,
    backgroundImg: "",
    percent: 0,
    playedTime: 0,
    totalTime: 0,
    totalTimeStr: "",
    playerTimeStr: "00:00",
    draging: false,
    nextId: 0,
    preId: 0,
  },
  async play(sid) {
    if(!app.globalData.currentPlayId && !sid){
      wx.navigateBack();
      return;
    }

    let currentId=sid ||app.globalData.currentPlayId;

    let ids = app.globalData.musicList;
    let currentIndex;
    let nextIndex;
    let preIndex;
    if(ids&& ids.length>0){
      currentIndex = ids.indexOf(Number(currentId));
      nextIndex = currentIndex + 1 >= ids.length ? 0 : currentIndex + 1;
      preIndex = currentIndex - 1 < 0 ? ids.length - 1 : currentIndex - 1;
      this.setData({
        nextId: ids[nextIndex],
        preId: ids[preIndex],
      })
    }
    if(!sid&&app.globalData.currentPlayId){
      let info=app.globalData.currentPlayInfo;
      this.setData({
        backgroundImg: info.backgroundImg,
        totalTime: this.innerAudioContext.duration*1000,
        totalTimeStr: this.convertTimeToStr(this.innerAudioContext.duration * 1000),
        playing: true,
      })
      this.onTimeUpdate();
      wx.setNavigationBarTitle({
        title: info.name,
      });
      this.registerEvent();
      return;
    }

    let data = await req(ERequestApi.Play, {
      data: { id: sid }
    })
    if (data.code === ERequestStatus.Ok && data.data.length > 0) {
      if (!data.data[0].url) {
        this.disvailCount++;
        if (this.disvailCount === ids.length) {
          app.globalData.musicListType="";
          wx.navigateBack();
          return;
        }
        await this.playNextMusic();
        return;
      }
      this.innerAudioContext.src = data.data[0].url;
      data = await req(ERequestApi.Song, {
        data: { ids: sid }
      })
      if (data.code === ERequestStatus.Ok) {
        app.globalData.currentPlayId=sid;
        let song = data.songs[0];
        let pic = song.al.picUrl;
        app.globalData.currentPlayInfo={
          backgroundImg: pic,
          name: song.name
        }
        this.setData({
          backgroundImg: pic,
          totalTime: song.dt,
          totalTimeStr: this.convertTimeToStr(song.dt),
          playing: true,
        })
        wx.setNavigationBarTitle({
          title: song.name,
        });
      }
      this.registerEvent();
    }
  },
  async playNextMusic() {
    await this.play(this.data.nextId);
  },
  async playPrevMusic() {
    await this.play(this.data.preId);
  },
  onTimeUpdate() {
    if (this.data.draging) return;
    let currentTime = this.innerAudioContext.currentTime * 1000;
    this.setData({
      playedTime: currentTime,
      playerTimeStr: this.convertTimeToStr(currentTime),
      percent: Math.floor(currentTime / this.data.totalTime * 100)
    })
  },
  registerEvent() {
      this.innerAudioContext.onTimeUpdate(this.onTimeUpdate);
  },
  removeEvent() {
    this.innerAudioContext.offTimeUpdate(this.onTimeUpdate);
  },
  convertTimeToStr(time) {
    let m = "0" + Math.floor(time / 1000 / 60);
    let s = Math.floor((time / 1000) % 60);
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
  handleChanged(e) {
    let curVal = e.detail.value;
    let self = this;
    this.innerAudioContext.seek(curVal / 1000);
    this.innerAudioContext.onSeeked(res => {
      this.setData({ draging: false });
      self.onTimeUpdate();
    });
  },
  handleChangeing(e) {
    this.setData({ draging: true });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sid = options.sid;
      this.play(sid);

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    if (this.innerAudioContext) {
      // this.innerAudioContext.stop();
      // this.setData({playing:false});
    }
  },
})