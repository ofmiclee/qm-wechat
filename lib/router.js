/**
 * 路由
 * @author MicLee OF578
 * @date 2015-07-09
 */

"use strict";

/**
* Module dependencies.
*/
var router = require('koa-router')();
var service = require('./service');

router

  //请求授权
  .get('/oauth/req', service.oAuthReq)

  //请求授权 微信回调访问
  .get('/oauth/code', service.oAuthCode)

  .get('/authorizer/token', function *() {
    var query = this.query;
    if (query.appid) {
      this.body = yield service.getAuthorizerToken(query.appid);
    } else {
      this.body = '获取用户token失败，appid缺失。' 
    }
  }

  //微信事件推送（发送ticket、用户取消授权推送）
  .post('/event', service.eventProxy)

  //代替公众号接收消息与事件
  .post('/msg/:appid', service.msgProxy)

/**
 * Expose `OAuth`.
 */
exports = module.exports = router;
