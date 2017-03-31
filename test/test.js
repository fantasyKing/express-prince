/**
 * Created on 03/31/2017.
 */
import test from 'ava';
import rq from 'request-promise';

test('test', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:5050/test',
    body: {
      name: 'handsome'
    },
    json: true
  };
  try {
    const result = await rq(options);
    console.log('result', result);
    t.truthy(result);
  } catch (err) {
    console.log('err', err.message);
    t.falsy(false);
  }
});
