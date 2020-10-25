function mockSessionCookies(res) {
  if (!res.header['Set-Cookie']) return;
  let obj = wx.getStorageSync('mockSessionCookies');
  let cookies;
  if (obj) {
    if (typeof obj === "string")
      cookies = JSON.parse(obj);
    else
      cookies = obj;
  }
  if (!cookies) cookies = {};
  //解析Set-Cookie. wx.request会将多个Set-Cookie以','连接
  res.header['Set-Cookie'].split('HttpOnly,').forEach(ck => {
    let kv = ck.split(';')[0].split('=');
    cookies[kv[0]] = kv[1];
  })
  wx.setStorageSync('mockSessionCookies', cookies);
}

function serializeJson(obj) {
  let str = '';
  for (let k in obj) {
    str += k + '=' + obj[k] + ';';
  }
  return str;
}

function codeApt(data) {
  if (data.code)
    return data.code;
  else if (data.result) {
    if (data.result === 100)
      return 200;
  }
  return 0;
}

function req(api, query = {}) {
  return new Promise(resolve => {
    wx.request({
      url: api,
      method: "GET",
      ...query,
      success: res => {
        //保存每次请求的Set-Cookie
        mockSessionCookies(res);
        if (res.data.code === 301) {
          wx.redirectTo({
            url: "/pages/login/login"
          })
        }

        let result = {
          ...res.data,
          code: codeApt(res.data),
        }
        resolve(result);
      },
      header: {
        //每次请求都在header带上
        Cookie: serializeJson(wx.getStorageSync('mockSessionCookies'))
      }
    })
  })
}

module.exports = {
  req
}