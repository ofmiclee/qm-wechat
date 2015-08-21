// var co = require('co');
var redis = require('redis');
var wrapper = require('co-redis');

var RedisCo = function (config) {
  if (!(this instanceof RedisCo)) {
    return new RedisCo(config);
  }

  if (config.port && config.host && config.options) {
    this.client = wrapper(redis.createClient(config.port, config.host, config.options));

  } else {
    throw new Error('please check your config');
  }
}


/**
 * Expose `RedisCo`.
 */
module.exports = RedisCo;
