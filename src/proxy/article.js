import { Article } from './../model';

export default new class {
  /**
   * 获取文章列表
   * @param { page, limit, timestamp, text } params
   * @return
   */
  async list(params) {
    try {
      const { text } = params;
      let { page, limit, timestamp } = params;

      page = parseInt(page);
      limit = parseInt(limit);

      page = page && page > 0 && page || 1;
      limit = limit && limit > 1 && limit || 20;
      timestamp = timestamp || (Date.now() + 24 * 60 * 60 * 1000);

      const query = { display_time: { $lte: timestamp } };
      const filter = { sort: '-display_time', skip: (page - 1) * limit, limit };

      if (text) {
        query.$text = { $search: text };
      }
      logger.debug('query--->', query);
      const articles = await Article.find(query, null, filter).exec();

      const result = [];
      for (const article of articles) {
        result.push(article.obj());
      }

      const pagination = { page, limit, timestamp, text };

      return {
        pagination,
        result
      };
    } catch (err) {
      logger.debug('proxy.article.list.error', err);
      throw err;
    }
  }
};
