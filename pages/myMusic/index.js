// pages/myMusic/index.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus,EPlayListType } = require('../../utils/enum');

const app = getApp();

Component({
  data: {
    listCount: 0,
    playList: [],
  },
  pageLifetimes: {
    async show() {
      if (!app.globalData.isLogin) return;
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      this.setData({
        listCount: app.globalData.profile.playlistCount
      })
      await this.getUserPlayList();
    }
  },
  methods: {
    async getUserPlayList() {
      let uid = app.globalData.profile.userId;
      let data = await req(ERequestApi.PlayList, {
        data: { uid }
      });
      if (data.code === ERequestStatus.Ok) {
        this.setData({
          playList: data.playlist
        });
      }
    },
    goto(e) {
      let id = e.currentTarget.dataset.id;
      if (id) {
        app.globalData.musicListId = id;
        app.globalData.musicListType = EPlayListType.PlayList;
      }
      else
        app.globalData.musicListType = "";
      wx.switchTab({
        url: "/pages/musicList/musicList"
      })
    }
  }
})