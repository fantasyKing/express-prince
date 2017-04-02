import article from './article';

export default [
  // [method, route, [middlewares], handler, [params], [params_options], [params_types]]
  ['POST', '/list', [], article.list, ['page', 'limit', 'timestamp', 'text'],
    [0, 0, 0, 0],
    ['number', 'number', 'number', 'string']
  ]
];
