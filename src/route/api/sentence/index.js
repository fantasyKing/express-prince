import parseForm from './../../../middleware/parse_form';
import segment from './../../../middleware/segment';

import sentence from './sectence';

export default [
  // [method, route, [middlewares], handler, [params], [params_options], [params_types]]
  ['POST', '/text', [parseForm.parse, segment.parse], sentence.text, ['sentence'],
    [0],
    ['string']
  ]
];
