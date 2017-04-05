export default new class {
  /**
   * 将经过语音转换和词法分析的结果返回给客户端
   */
  text = async (params) => {
    try {
      const { text } = params;
      if (!text) {
        throw new Error('未解析到关键词');
      }
      return text;
    } catch (err) {
      logger.error('proxy.segment.text.error', err);
      throw err;
    }
  }
};
