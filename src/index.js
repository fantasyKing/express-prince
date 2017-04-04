/**
 * Created on 03/31/2017.
 */
import Logger from 'simple-logger';

import HTTP from './server/http';
import config from './config';

global.logger = Logger.getLogger(config.logger.category); // 获取日志对象
logger.setLevel(config.logger.level); // 设置日志级别

const port = process.env.PORT || 5050; // http server 启动端口

async function main() {
  try {
    const router = require('./route');
    const server = new HTTP({
      port
    }); // 初始化http server
    server.use(router.apiRouter); // 加载自定义路由
    server.start(); // start server
  } catch (e) {
    logger.error('main err = ', e);
  }
}

main();
