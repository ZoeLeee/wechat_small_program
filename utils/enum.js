const ERequestStatus={
  Ok:200,
  NotLogin:301,
}
const ERequestApi={
  RecommendSongList:"personalized",
  LatestAlbum:"album/newest",
  Banner:"banner",
  Refresh:"login/refresh",
  LoginStatus:"login/status",
  EmailLogin:"login",
  PhoneLogin:"login/cellphone",
  Loginout:"logout",
}
module.exports = {
  ERequestStatus,ERequestApi
}