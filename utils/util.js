const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const USER_NAME_REGEXP = /^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/;
const PHONE_REGEXP = /^0?(13|14|15|18|17)[0-9]{9}$/;
const EMAIL_REGEXP = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/;

module.exports = {
  formatTime,
  USER_NAME_REGEXP,
  PHONE_REGEXP,EMAIL_REGEXP
}
