/**
 * Created on 03/31/2017.
 */
const env = process.env.NODE_ENV || 'development';

let common = null;
let mongo = null;
if (env === 'production') {
  common = require('./prod_common');
  mongo = require('./prod_mongo');
} else {
  common = require('./dev_common');
  mongo = require('./dev_mongo');
}


common.mongo = mongo;

export default common;
