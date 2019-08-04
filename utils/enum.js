const ERequestStatus={
  Ok:200,
  NotLogin:301,
}
const ERequestApi={
  RecommendSongList:"recommend/songs", //每日推荐歌曲
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
}
module.exports = {
  ERequestStatus,ERequestApi
}