export default new class {
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
