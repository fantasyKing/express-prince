import Base from './../base';
import test from './../../../proxy/test';

/**
 * Tips: 方法名不能重复
 */

export default new class extends Base {
  /**
   * 测试接口
   * @method POST
   * @url /test
   * @param req
   * @param res
   * @param params { }
   * @return { }
   */
  test = async(req, res, params) => {
    try {
      const result = await test.sayHello(params);
      this.ok(res, result);
    } catch (e) {
      logger.error({
        req: params,
        err: e,
        params
      }, 'api.test.error');
      this.fail(res)(e);
    }
  }
};
