const {req} = require('../../utils/request');

const {ERequestApi,ERequestStatus,EQQRequestApi,ETabType} = require('../../utils/enum');

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hidden:Boolean,
    type:Number,
  },
  options:{
    addGlobalClass: true,
  },
  /**
   * 组件的初始数据
   */
  data: {
    banners: [],
  },
  lifetimes: {
    async attached() {
      //请求轮播图
      switch(this.properties.type){
        case ETabType.NetEase:
          await this.getBanners();
          break;
        case ETabType.QQ:
          await this.getQQBanner();
          break;
        case ETabType.Xiami:
          await this.getQQBanner();
          break;
        case ETabType.MiGu:
          await this.getQQBanner();
          break;
        default:
          break;
      }
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getBannerData(data){
      switch(this.properties.type){
        case ETabType.NetEase:
          return data.filter(b=>b.targetType===1) 
        case ETabType.QQ:
          return data.map(d=>{
            return {
              imageUrl:d.pic_info.url,
              targetId:d.id,
            }
          })
        case ETabType.Xiami:
          break;
        case ETabType.MiGu:
          break;
        default:
          break;
      }
      return [];
    },
    async getBanners() {
      let data = await req(ERequestApi.Banner);
      if (data.code === ERequestStatus.Ok) {
        this.setData({ banners: this.getBannerData(data.banners)})
      }
    },
    async getQQBanner(){
      let data = await req(EQQRequestApi.Banner);
      if (data.code === ERequestStatus.Ok) {
        this.setData({ banners: this.getBannerData(data.data)})
      }
    },
    goto(e){
      app.globalData.musicListType=e.currentTarget.dataset.type;
      wx.switchTab({
        url:"/pages/musicList/musicList",
      })
    }
  }
})
