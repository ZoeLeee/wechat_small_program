
const HOST ="http://localhost:3000/"

function req(api,query={}){
  return new Promise(res=>{
    wx.request(Object.assign(
      {
        url: HOST + api,
        method: "GET",
        success: data => {
          res(data);
        }
      },query
    ))
  })
}

module.exports = {
  req
}