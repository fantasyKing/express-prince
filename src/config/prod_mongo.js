/**
 * Created on 03/31/2017.
 */
export default {
  user: {
    uri: 'mongodb://192.168.100.100,192.168.100.101/user',
    sid: 'user',
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
      user: 'user',
      pass: 'test'
    },
    dbs: [{
      name: 'user',
      default: true
    }]
  }
};
