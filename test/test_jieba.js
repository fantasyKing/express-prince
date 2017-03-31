import test from 'ava';
import nodejieba from 'nodejieba';

test('jieba', async t => {
  try {
    let sentence = '我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。';
    sentence = '请帮我搜索梅西相关的文章';
    sentence = '帮我搜索梅西参加的比赛';
    sentence = '梅西';

    let result;

    // 没有主动调用nodejieba.load载入词典的时候，
    // 会在第一次调用cut或者其他需要词典的函数时，自动载入默认词典。
    // 词典只会被加载一次。
    nodejieba.load();
    result = nodejieba.cut(sentence);
    console.log('result 1 --->', result);

    result = nodejieba.cut(sentence, true);
    console.log('result 2 --->', result);

    result = nodejieba.cutHMM(sentence);
    console.log('result 3 --->', result);

    result = nodejieba.cutAll(sentence);
    console.log('result 4 --->', result);

    result = nodejieba.cutForSearch(sentence);
    console.log('result 5 --->', result);

    result = nodejieba.tag(sentence);
    console.log('result 6 --->', result);

    const topN = 3;
    result = nodejieba.extract(sentence, topN);
    console.log('result 7 --->', result);

    result = nodejieba.cut('男默女泪');
    console.log('result 8 --->', result);
    nodejieba.insertWord('男默女泪');
    result = nodejieba.cut('男默女泪');
    console.log('result 9 --->', result);

    result = nodejieba.cutSmall('南京市长江大桥', 3);
    console.log('result 10 --->', result);
  } catch (err) {
    console.log('err', err);
    t.falsy(false);
  }
});
