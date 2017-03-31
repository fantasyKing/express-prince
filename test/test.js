/**
 * Created on 03/31/2017.
 */
import test from 'ava';
import rq from 'request-promise';
import util from 'util';

test.skip('test', async t => {
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
    console.log('result', util.inspect(result, { depth: null }));
    t.truthy(result);
  } catch (err) {
    console.log('err', err.message);
    t.falsy(false);
  }
});

test('/article/list', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:5050/article/list',
    body: {
      text: '梅西'
    },
    json: true
  };
  try {
    const result = await rq(options);
    console.log('result', util.inspect(result, { depth: null }));
    t.truthy(result);
  } catch (err) {
    console.log('err', err.message);
    t.falsy(false);
  }
});
