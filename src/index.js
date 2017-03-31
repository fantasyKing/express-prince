/**
 * Created on 03/31/2017.
 */
import Logger from 'simple-logger';

import HTTP from './server/http';
import config from './config';

global.logger = Logger.getLogger(config.logger.category);

const port = process.env.PORT || 5050;

async function main() {
  try {
    const router = require('./route');
    const server = new HTTP({
      port
    });
    server.use(router.apiRouter);
    server.start();
  } catch (e) {
    logger.error({
      err: e
    }, 'main.error');
  }
}

main();
