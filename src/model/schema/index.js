/**
 * Created on 03/31/2017.
 */
import config from '../../config';
import utils from './../../utils';
import article from './article';

const schemas = [
  article
];

const models = utils.mongoDB(config.mongo, schemas);

export default models;
