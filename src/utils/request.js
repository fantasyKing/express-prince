import request from 'request';

export default new class {
  post = (uri, body) => new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      uri,
      body,
      json: true
    };
    request(options, (err, res, resbody) => {
      if (err) {
        return reject(err);
      }
      return resolve(resbody);
    });
  });
};
