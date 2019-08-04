const { req } = require('../../utils/request.js');
const { ERequestApi, ERequestStatus } = require('../../utils/enum');

const app=getApp();

Component({
  data: {
    tabs: ["网易云", "qq音乐", "虾米音乐","咪咕音乐"],
    activeIndex: 0,
    sliderOffset: 0,
    banners: [],
  },
  lifetimes: {
    async attached() {
      // 需要设置slider的宽度，用于计算中间位置
      var sliderWidth = 750 / this.data.tabs.length;
      wx.getSystemInfo({
        success: (res) => {
          this.setData({
            sliderOffset: sliderWidth * this.data.activeIndex
          });
        }
      });

      //请求轮播图
      await this.getBanners();
    },
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
      this.checkLogin();
    }
  },
  methods: {
    checkLogin(){
      const app=getApp();
      let profile=wx.getStorageSync("profile");
      app.globalData.isLogin=Boolean(wx.getStorageSync("profile"));
      if(app.globalData.isLogin){
        app.globalData.profile=JSON.parse(profile);
      }
    },
    async getBanners() {
      let data = await req(ERequestApi.Banner);
      if (data.code === ERequestStatus.Ok) {
        this.setData({ banners: data.banners })
      }
    },
    tabClick(e) {
      this.setData({
        sliderOffset: e.currentTarget.offsetLeft,
        activeIndex: e.currentTarget.id
      });
    },
    goto(e){
      app.globalData.musicListType=e.currentTarget.dataset.type;
      wx.switchTab({
        url:"/pages/musicList/musicList",
      })
    }
  }
});