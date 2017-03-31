/**
 * Created on 03/31/2017.
 */
export default {
  spider: {
    uri: 'mongodb://localhost/spider',
    sid: 'spider',
    options: {
      db: {
        native_parser: true
      },
      server: {
        poolSize: 5,
        auto_reconnect: true,
        socketOptions: {
          keepAlive: 1
        }
      },
      user: 'spider',
      pass: 'prince'
    },
    dbs: [{
      name: 'spider',
      default: true
    }]
  }
};
