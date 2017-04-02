export default new class {
  text = async (params) => {
    try {
      const { sentence } = params;
      if (!sentence) {
        throw new Error('未解析到关键词');
      }
      return sentence;
    } catch (err) {
      logger.error('proxy.segment.text.error', err);
      throw err;
    }
  }
};
