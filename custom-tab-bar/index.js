Component({
  data: {
    selected: 0,
    color: "#919191",
    selectedColor: "#DA5E56",
    list: [
      {
        pagePath: "/pages/index/index",
        text: "发现音乐",
        iconPath: "/images/cm2_btm_icn_discovery.png",
        selectedIconPath: "/images/cm2_lay_icn_quality_new@2x.png"
      },
      {
        pagePath: "/pages/myMusic/index",
        text: "我的音乐",
        iconPath: "/images/cm2_btm_icn_music.png",
        selectedIconPath: "/images/cm2_lay_icn_similar_new@2x.png"
      },
      {
        pagePath: "/pages/my/index",
        text: "账号",
        iconPath: "/images/cm2_btm_icn_account.png",
        selectedIconPath: "/images/cm2_list_icn_artists_new@2x.png"
      }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({ url });
      this.setData({
        selected: data.index
      })
    }
  }
})