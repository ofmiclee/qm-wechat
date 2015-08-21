/**
 * 千米第三方平台账号信息【私密】
 */
var config = {};

config.wechat = {
  appid: 'appid',

  appsecret: 'appsecret',

  msg_token: 'token',

  msg_aeskey: 'aeskey'
};

config.redis = {
  host: '',
  port: '6379',
  max: '100',
  min: 1,
  timeout: 30000,
  log: false,
  db: 0,
  redis_options: {
    // https://github.com/mranney/node_redis#rediscreateclient
  }
}


module.exports = config;
