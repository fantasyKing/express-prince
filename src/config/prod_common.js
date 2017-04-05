/**
 * Created on 03/31/2017.
 */
const path = require('path');

module.exports = {
  logger: {
    category: 'express-prince',
    level: 'DEBUG'
  },
  public_path: path.resolve(__dirname, '../public'),
  upload_path: '/upload/',
  baidu_voice: { // 百度语音转换的，帐号配置，建议自己去申请。
    appid: 'yLabOQwDb3pjGa1T5lzgKovm',
    appsecret: '0a8a7266cd6a2ed7b0e64eb4b6086280'
  },
  language: 'zh'
};
