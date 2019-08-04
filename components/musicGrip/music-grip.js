// components/musicGrip/music-grip.js
const {req}=require('../../utils/request.js');
const {ERequestStatus,ERequestApi,EPlayListType}=require('../../utils/enum.js');

const app=getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title:String,
    apiType:String,
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
    async handleReq(){
      let data= await req(this.properties.apiType);
      if(data.code===ERequestStatus.Ok){
        console.log(this.properties.apiType);
        switch(this.properties.apiType){
          case ERequestApi.RecommendSongList:
            this.setData({
              list: data.result.slice(0,6)
            });
            break;
          case ERequestApi.LatestAlbum:
            this.setData({
              list:data.albums.slice(0,6)
            });
          default:
            break;
        }
      }
    },
    goto(e){
      let id=e.currentTarget.dataset.id;
      app.globalData.musicListId=id;
      if(this.properties.apiType==="album/newest"){
        //新专辑
        app.globalData.musicListType=EPlayListType.Album;
      }
      else{
        //推荐歌单
        app.globalData.musicListType=EPlayListType.PlayList;
      }
      wx.switchTab({
        url:"/pages/musicList/musicList",
      });
    }
  },
  lifetimes: {
    async attached(){
      // 在组件实例进入页面节点树时执行
     await this.handleReq();
    },
    async detached() {
      // 在组件实例被从页面节点树移除时执行
     
    },
  },
})
