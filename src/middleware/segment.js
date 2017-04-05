import nodejieba from 'nodejieba';

export default new class {
  /**
   * 词法分析中间件
   */
  parse = (req, res, next) => {
    try {
      const sentence = req.body.sentence; // 获取语音识别中间件的结果
      if (sentence) {
        const topN = 2;
        let weights = nodejieba.extract(sentence, topN); // 保留前两位中n和x词性的词

        const tags = nodejieba.tag(sentence); // 获取文字中所有的词性

        const obj = {};
        for (const tag of tags) {
          obj[tag.word] = tag.tag;
        }

        const reg = /^n|^x/i; // 正则表达式：用于过滤以n和x开头的词
        weights = weights.length && weights.filter((ele) => {
          if (reg.test(obj[ele.word])) {
            return true;
          }
          return false;
        }).map((ele) => ele.word).join(' ')
        .trim() || '';

        req.body.text = weights || ''; // 将词法分析的结果，绑定到text字段，
      }
      return next();
    } catch (err) {
      logger.error('segment.parse.error', err);
      return next();
    }
  }
};
