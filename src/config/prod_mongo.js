/**
 * Created on 03/31/2017.
 */
export default {
  spider: {
    uri: 'mongodb://192.168.202.210,192.168.202.211/spider',
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
      replset: {
        rs_name: 'foba'
      },
      user: 'spider',
      pass: 'spider'
    },
    dbs: [{
      name: 'spider',
      default: true
    }]
  }
};
