import stringUtil from './../utils/stringUtil';

export default new class {
  /**
   * 将经过语音转换和词法分析的结果返回给客户端
   */
  text = async (params) => {
    try {
      const { text, sentence } = params;
      const result = { text, sentence };
      result.text = stringUtil.removeComma(result.text);
      return result;
    } catch (err) {
      logger.error('proxy.segment.text.error', err);
      throw err;
    }
  }
};
