const ERequestStatus={
  Ok:200,
  NotLogin:301,
}
const ERequestApi={
  RecommendSongList:"personalized", //推荐歌单

  DailyRecommendSongList:"recommend/songs", //每日推荐歌曲
  RecommendResourceList:"recommend/resource",  //每日推荐歌单
  LatestAlbum:"album/newest",
  Banner:"banner",
  Refresh:"login/refresh",
  LoginStatus:"login/status",
  EmailLogin:"login",
  PhoneLogin:"login/cellphone",
  Loginout:"logout",
  LikeList:"likelist",
  Song:"song/detail", //歌曲详情 
  Play:"song/url",  //播放音乐
  Check:"check/music",
  PlayListDetail:"playlist/detail",
  PlayList:"user/playlist", //获取用户歌单
}

const EPlayListType={
  Recommend:"recommend",
  PlayList:"playList",
  Album:"album",
}

module.exports = {
  ERequestStatus,ERequestApi,EPlayListType
}