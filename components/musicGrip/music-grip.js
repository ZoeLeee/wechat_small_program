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
      let api;
      switch(this.properties.apiType){
        case "personalized":
          api=ERequestApi.RecommendSongList;
          break;
        case "album/newest":
          api=ERequestApi.LatestAlbum;
          break;
        default:
          break;
      }

      if(!api) return;

      let data= await req(api);
      if(data.code===ERequestStatus.Ok){
        switch(api){
          case ERequestApi.RecommendSongList:
            for(let item of data.result){
              if(item.name.length>15)
                item.name=item.name.slice(0,14)+"...";
            }
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
