// pages/myMusic/index.js
const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus } = require('../../utils/enum');

const app=getApp();

Component({
  data:{
    likeList:[],
    listCount:0,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      this.setData({
        listCount:app.globalData.profile.playlistCount
      })
      this.getLikeList();
    }
  },
  methods:{
    async getLikeList(){
      let uid=app.globalData.profile.userId;
      let {data}=await req(ERequestApi.LikeList,{
        uid
      });
      if(data.code===ERequestStatus.Ok){
        this.setData({
          likeList:data.ids
        });
        app.globalData.musicList=data.ids;
      }
    }
  }
})