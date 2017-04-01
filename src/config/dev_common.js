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
  upload_path: '/upload/'
};
