import Base from './../base';
import sectence from './../../../proxy/sentence';

/**
 * Tips: 方法名不能重复
 */

export default new class extends Base {
  /**
   * 返回语音中解析出来的搜索关键词
   * @method POST
   * @url sectence/text
   * @param req
   * @param res
   * @param params { }
   * @return { }
   */
  text = async(req, res, params) => {
    try {
      const result = await sectence.text(params);
      return this.ok(res, result);
    } catch (err) {
      logger.error('router.sectence.text.error', err);
      return this.fail(res)(err);
    }
  }
};
