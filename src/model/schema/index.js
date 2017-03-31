/**
 * Created on 03/31/2017.
 */
import config from '../../config';
import utils from './../../utils';

const schemas = [];

const models = utils.mongoDB({
  user: config.mongo.user
}, schemas);

const obj = Object.assign({}, models);

export default obj;
