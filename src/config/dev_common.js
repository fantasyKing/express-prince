/**
 * Created on 03/31/2017.
 */
const path = require('path');

module.exports = {
  logger: { // 日志的id和level配置
    category: 'express-prince',
    level: 'DEBUG'
  },
  public_path: path.resolve(__dirname, '../public'),
  upload_path: '/upload/',
  baidu_voice: { // 百度语音转换的，帐号配置，建议自己去申请。
    appid: 'yLabOQwDb3pjGa1T5lzgKovm',
    appsecret: '0a8a7266cd6a2ed7b0e64eb4b6086280'
  },
  language: 'zh' // 语音转换的类型。zh: 简体中文
};
