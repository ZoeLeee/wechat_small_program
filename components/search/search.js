// components/search.js

const { req } = require('../../utils/request.js');
const { ERequestStatus, ERequestApi, EPlayListType } = require('../../utils/enum.js');

const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    timeId: null,
    songlist: [],
  },
  /**
   * 组件的方法列表
   */
  methods: {
    showInput: function () {
      this.setData({
        inputShowed: true
      });
    },
    hideInput: function () {
      this.setData({
        inputVal: "",
        inputShowed: false
      });
    },
    clearInput: function () {
      this.setData({
        inputVal: ""
      });
    },
    inputTyping(e) {
      this.setData({
        inputVal: e.detail.value
      });
      if (this.timeId) {
        console.log(this.timeId);
        clearTimeout(this.timeId);
      }
      this.timeId = setTimeout(async () => {
        let data = await req(ERequestApi.SearchSuggest, { data: { keywords: e.detail.value, type: "mobile" } });
        if (data.code === ERequestStatus.Ok) {
          this.setData({
            list: data.result.allMatch
          });
        }
      }, 500);
    },
    goto(e) {
      app.globalData.keyword=e.target.dataset.keyword;
      app.globalData.musicListType=EPlayListType.Keyword
      this.clearInput();
      wx.switchTab({
        url: '/pages/musicList/musicList'
      });
    }
  }
});
