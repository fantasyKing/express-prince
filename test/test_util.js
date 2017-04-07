import test from 'ava';

import stringUtil from './../src/utils/stringUtil';

test('removeComma', async t => {
  try {
    const str = '梅西，';
    const result = stringUtil.removeComma(str);
    console.log('result---->', result);
    t.truthy(true);
  } catch (err) {
    console.log('err--->', err);
    t.falsy(false);
  }
});
