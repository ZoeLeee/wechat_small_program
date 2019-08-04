// pages/musicList/musicList.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus } = require('../../utils/enum');

const app=getApp();

Page({
  /**
   * 组件的初始数据
   */
  data: {
    list:[]
  },
  /**
   * 组件的方法列表
   */
  async getSongList(){
    //是否有音乐列表类型
    let data;
    let songs;
    let lastMusicListType=app.globalData.lastMusicListType;
    let musicListType=app.globalData.musicListType;
    if(lastMusicListType===musicListType){
      this.setData({
        list:app.globalData.songs
      });
      return;
    }
    
    app.globalData.lastMusicListType=musicListType;
    switch(app.globalData.musicListType){
      case "recommend":
        data=await req(ERequestApi.RecommendSongList);
        if(data.code===ERequestStatus.Ok){
          app.globalData.musicList=data.recommend.map(s=>s.id);
          songs=data.recommend;
        }
        break;
      default:
          let ids=app.globalData.musicList;
          data=await req(ERequestApi.Song,{
            data:{ids:ids.join(",")}
          })
          if(data.code===ERequestStatus.Ok){
            songs=data.songs;
          }
    }

    this.setData({
      list:songs
    });
    app.globalData.songs=songs;

  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.getSongList();
  },
  onHide(){
    this.setData({
      list:[]
    })
  }
})
