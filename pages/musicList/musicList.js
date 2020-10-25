// pages/musicList/musicList.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus, EPlayListType } = require('../../utils/enum');

const app = getApp();

Page({
  /**
   * 组件的初始数据
   */
  data: {
    list: []
  },
  /**
   * 组件的方法列表
   */
  async getSongList() {
    //是否有音乐列表类型
    let data;
    let songs = [];
    let lastMusicListType = app.globalData.lastMusicListType;
    let musicListType = app.globalData.musicListType;
    let musicListId = app.globalData.musicListId;
    let lastMusicListId = app.globalData.lastMusicListId;

    let privileges = [];

    if (musicListType
      && lastMusicListType === musicListType
      && lastMusicListId === musicListId
    ) {
      this.setData({
        list: app.globalData.songs
      });
      return;
    }

    app.globalData.lastMusicListType = musicListType;
    app.globalData.lastMusicListId = musicListId;
    switch (app.globalData.musicListType) {
      case EPlayListType.Recommend:
        data = await req(ERequestApi.DailyRecommendSongList);
        if (data.code === ERequestStatus.Ok) {
          app.globalData.musicList = data.data.dailySongs.map(s => s.id);
          songs = data.data.dailySongs;
          privileges = [];
        }
        break;
      case EPlayListType.PlayList:
        data = await req(ERequestApi.PlayListDetail, {
          data: { id: musicListId }
        });
        if (data.code === ERequestStatus.Ok) {
          songs = data.playlist.tracks;
          privileges = data.privileges;
          // app.globalData.musicList = songs.map(s => s.id);
        }
        break;
      case EPlayListType.Album:
        data = await req(ERequestApi.Album, {
          data: { id: musicListId }
        });
        if (data.code === ERequestStatus.Ok) {
          console.log(data);
          songs =data.songs;
          // privileges = data.privileges;
          // app.globalData.musicList = songs.map(s => s.id);
        }
        break;
      case EPlayListType.Keyword:
        let keyword = app.globalData.keyword;
        if (keyword) {
          data = await req(ERequestApi.Search, { data: { keywords: keyword } });
          if (data.code === ERequestStatus.Ok) {
            songs = data.result.songs;
          }
        }
        break;
      default:
        let ids = app.globalData.musicList;
        data = await req(ERequestApi.Song, {
          data: { ids: ids.join(",") }
        });
        if (data.code === ERequestStatus.Ok) {
          privileges = data.privileges;
          songs = data.songs;
        }
    }
    if (privileges.length === songs.length) {
      songs = songs.filter((s, index) => privileges[index].st !== -200 && Number(privileges[index].cp) === 1 && Number(privileges[index].sp) !== 0);
    }

    if (songs.length === 0) {
      wx.switchTab(
        {
          url: "/pages/index/index",
        }
      );
      return;
    }

    app.globalData.musicList = songs.map(s => s.id);
    this.setData({
      list: songs
    });
    app.globalData.songs = songs;

  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
    this.getSongList();
  },
  onHide() {
    this.setData({
      list: []
    });
  }
});
