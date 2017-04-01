import nodejieba from 'nodejieba';

export default new class {
  parse = (req, res, next) => {
    try {
      const sentence = req.params.sentence;
      if (sentence) {
        const topN = 3;
        const result = nodejieba.extract(sentence, topN);
        req.params.text = result[0] && result[0].word || '';
      }
      return next();
    } catch (err) {
      logger.error('segment.parse.error', err);
      return next();
    }
  }
};
