const ERequestStatus={
  Ok:200,
  NotLogin:301,
}
// const NET_EASE_HOST="http://localhost:3000/";
const NET_EASE_HOST="http://www.dodream.wang:3006/";
const QQ_HOST="http://localhost:3300/"

const ERequestApi={
  RecommendSongList:NET_EASE_HOST+"personalized", //推荐歌单
  DailyRecommendSongList:NET_EASE_HOST+"recommend/songs", //每日推荐歌曲
  RecommendResourceList:NET_EASE_HOST+"recommend/resource",  //每日推荐歌单
  LatestAlbum:NET_EASE_HOST+"album/newest",
  Banner:NET_EASE_HOST+"banner",
  Refresh:NET_EASE_HOST+"login/refresh",
  LoginStatus:NET_EASE_HOST+"login/status",
  EmailLogin:NET_EASE_HOST+"login",
  PhoneLogin:NET_EASE_HOST+"login/cellphone",
  Loginout:NET_EASE_HOST+"logout",
  LikeList:NET_EASE_HOST+"likelist",
  Song:NET_EASE_HOST+"song/detail", //歌曲详情 
  Play:NET_EASE_HOST+"song/url",  //播放音乐
  Check:NET_EASE_HOST+"check/music",
  PlayListDetail:NET_EASE_HOST+"playlist/detail",
  PlayList:NET_EASE_HOST+"user/playlist", //获取用户歌单
  Search:NET_EASE_HOST+"search", //搜索歌曲
  SearchSuggest:NET_EASE_HOST+"search/suggest", //搜索建议
  Album:NET_EASE_HOST+"album"
}

const EPlayListType={
  Recommend:"recommend",
  PlayList:"playList",
  Album:"album",
  Keyword:"kw",
}

const EQQRequestApi={
  Banner:QQ_HOST+"recommend/banner",
}

const ETabType={
  NetEase:0,
  QQ:1,
  Xiami:2,
  MiGu:3,
}

Object.freeze(ERequestApi);
Object.freeze(EPlayListType);
Object.freeze(ERequestStatus);
Object.freeze(ETabType);
Object.freeze(EQQRequestApi);

module.exports = {
  ERequestStatus,ERequestApi,EPlayListType,ETabType,EQQRequestApi
}