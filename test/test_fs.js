import fs from 'fs';
import path from 'path';

function test() {
  const read = fs.readFileSync(path.resolve(__dirname + '/file/test.txt'), 'utf-8');
  console.log('result', read);
}

test();