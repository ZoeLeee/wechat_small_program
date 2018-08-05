//index.js
//获取应用实例
const app = getApp()

const amusement=[
  {title:"音乐",url:"",icon:"icon-customerservice_fill"},
  {title:"相声评书",url:"",icon:"icon-customerservice_fill"},
  {title:"段子",url:"",icon:"icon-customerservice_fill"},
  {title:"情感生活",url:"",icon:"icon-customerservice_fill"},
  {title:"音乐",url:"",icon:"icon-customerservice_fill"},
  {title:"音乐",url:"",icon:"icon-customerservice_fill"},
  {title:"音乐",url:"",icon:"icon-customerservice_fill"},
  {title:"音乐",url:"",icon:"icon-customerservice_fill"},
  {title:"音乐",url:"",icon:"icon-customerservice_fill"},
]

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    historys:[],
    bookCategory:[
      {title:"有声小说",url:"",icon:"icon-customerservice_fill",category:[{title:"言情",url:""},{title:"悬疑",url:""},{title:"都市",url:""}]},
      {title:"畅销书",url:"",icon:"icon-tushu",category:[{title:"言情",url:""},{title:"悬疑",url:""},{title:"都市",url:""}]},
      {title:"儿童",url:"",icon:"icon-wangwang",category:[{title:"言情",url:""},{title:"悬疑",url:""},{title:"都市",url:""}]}],
    amusement,
  },
  onLoad: function () {
    
  }
  
})
