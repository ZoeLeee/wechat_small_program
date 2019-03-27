
const HOST ="http://www.dodream.online:3333/";

function mockSessionCookies(res){
  if( !res.header['Set-Cookie'] ) return;
  let obj=wx.getStorageSync('mockSessionCookies');
  let cookies = obj&&JSON.parse(obj);
  if( !cookies ) cookies = {};
  //解析Set-Cookie. wx.request会将多个Set-Cookie以','连接
  res.header['Set-Cookie'].split('HttpOnly,').forEach( ck => {
    let kv = ck.split(';')[0].split('=');
    cookies[ kv[0] ] = kv[1];
  })
  wx.setStorageSync('mockSessionCookies', cookies);
}

function serializeJson(obj){
  let str = '';
  for( let k in obj ){
    str += k + '=' + obj[k] + ';';
  }
  return str;
}

function req(api,query={}){
  return new Promise(resolve=>{
    wx.request(Object.assign(
      {
        url: HOST + api,
        method: "GET",
        success: res => {
          //保存每次请求的Set-Cookie
          mockSessionCookies(res);
          if(res.data.code===301){
            wx.redirectTo({
              url: "/pages/login/login"
            })
          }
          resolve(res);
        },
        header:{
          //每次请求都在header带上
          Cookie:serializeJson(wx.getStorageSync('mockSessionCookies'))
        }
      },query
    ))
  })
}

module.exports = {
  req
}