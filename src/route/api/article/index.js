import article from './article';
import segment from './../../../middleware/segment';

export default [
  // [method, route, [middlewares], handler, [params], [params_options], [params_types]]
  ['POST', '/list', [segment.parse], article.list, ['page', 'limit', 'timestamp', 'sentence'],
    [0, 0, 0, 0],
    ['number', 'number', 'number', 'string']
  ]
];
