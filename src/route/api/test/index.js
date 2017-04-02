import test from './test';
import parseForm from './../../../middleware/parse_form';

export default [
  // [method, route, [middlewares], handler, [params], [params_options], [params_types]]
  ['POST', '', [parseForm.ConvertToAmr], test.test, ['name'],
    [0],
    ['string']
  ]
];
