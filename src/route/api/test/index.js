import test from './test';

export default [
  // [method, route, [middlewares], handler, [params], [params_options], [params_types]]
  ['POST', '', [], test.test, ['name'],
    [1],
    ['string']
  ]
];
