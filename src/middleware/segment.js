import nodejieba from 'nodejieba';

export default new class {
  parse = (req, res, next) => {
    try {
      const sentence = req.body.sentence;
      if (sentence) {
        const topN = 2;
        let weights = nodejieba.extract(sentence, topN); // 保留前两位中n和x词性的词

        const tags = nodejieba.tag(sentence);

        const obj = {};
        for (const tag of tags) {
          obj[tag.word] = tag.tag;
        }

        const reg = /^n|^x/i;
        weights = weights.length && weights.filter((ele) => {
          if (reg.test(obj[ele.word])) {
            return true;
          }
          return false;
        }).map((ele) => ele.word).join(' ')
        .trim() || '';

        req.body.text = weights || '';
      }
      return next();
    } catch (err) {
      logger.error('segment.parse.error', err);
      return next();
    }
  }
};
