export default new class {
  /**
   * 解析http request 中的参数
   */
  json = (req, res, next) => {
    try {
      const params = this.parseParams(req, req.method);
      req.params = params;
      return next();
    } catch (err) {
      req.params = {};
      logger.error('params_parser.error', err);
      return next();
    }
  }

  parseParams = (req, method) => {
    const params = {};
    for (const key of Object.keys(req.params)) {
      params[key] = req.params[key];
    }
    if (method === 'GET') {
      for (const key of Object.keys(req.query)) {
        params[key] = req.query[key];
      }
    } else if (method === 'POST' || method === 'PUT') {
      for (const key of Object.keys(req.body)) {
        params[key] = req.body[key];
      }
      if (req.query) {
        for (const key of Object.keys(req.query)) {
          params[key] = req.query[key];
        }
      }
    }
    if (req.ms_request_id) {
      params.ms_request_id = req.ms_request_id;
    }
    return params;
  }
};
