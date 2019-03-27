// pages/likeList/likeList.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus } = require('../../utils/enum');

const app=getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {
    async getSongList(){
      let ids=app.globalData.musicList;
      let {data}=await req(ERequestApi.Song,{
        data:{ids:ids.join(",")}
      })
      if(data.code===ERequestStatus.Ok){
        data.songs.sort((a,b)=>parseFloat(b.publishTime)-parseFloat(a.publishTime));
        this.setData({
          list:data.songs
        })
      }
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      this.getSongList();
    }
  }
})
