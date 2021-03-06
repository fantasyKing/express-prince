import { Article } from './../model';

const PROJECTION = {
  title: 1,
  description: 1,
  url: 1,
  display_time: 1,
  thumb: 1,
  article_id: 2
};

const SEARCHKEYS = ['title', 'text', 'description'];

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
        const $or = [];
        const regStr = text.trim().split(' ').join('|');
        for (const key of SEARCHKEYS) {
          const obj = {};
          const reg = new RegExp(`${regStr}`, 'i');
          obj[key] = reg;
          $or.push(obj);
        }
        query.$or = $or;
      }
      logger.debug('query--->', query);
      const articles = await Article.find(query, PROJECTION, filter).exec();

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
      logger.error('proxy.article.list.error', err);
      throw err;
    }
  }
};
