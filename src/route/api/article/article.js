import Base from './../base';
import article from './../../../proxy/article';

/**
 * Tips: 方法名不能重复
 */

export default new class extends Base {
  /**
   * 测试接口
   * @method POST
   * @url article/list
   * @param req
   * @param res
   * @param params { }
   * @return { }
   */
  list = async(req, res, params) => {
    try {
      const result = await article.list(params);
      return this.ok(res, result);
    } catch (err) {
      logger.error('router.article.list.error', err);
      return this.fail(res)(err);
    }
  }
};
