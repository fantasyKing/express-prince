import express from 'express';
import api from './api';
import routerSetup from './../utils/router_setup';

const apiRouter = express.Router();
routerSetup(apiRouter, api);

export {
  apiRouter
};
