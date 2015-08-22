/**
 * 路由
 * @author MicLee OF578
 */

"use strict";

/**
* Module dependencies.
*/
var router = require('koa-router')();
var service = require('./service');

router

  /**********************************************************
   *                      第三方平台授权                       *
   **********************************************************/
  //请求授权
  .get('/oauth/req', service.oAuthReq)

  //请求授权 微信回调访问
  .get('/oauth/code', service.oAuthCode)

  //根据APPID 获取授权token
  .get('/authorizer/token/:appid', function *() {
    var appid = this.params.appid;
    if (appid) {
      this.body = yield service.getAuthorizerToken(appid);
    } else {
      this.body = '获取用户token失败，appid缺失。'
    }
  })

  //根据APPID 刷新授权token
  .get('/authorizer/refreshtoken/:appid', function *() {
    var appid = this.params.appid;
    if (appid) {
      this.body = yield service.refreshToken(appid);
    } else {
      this.body = '刷新用户token失败，appid缺失。'
    }
  })

  //微信事件推送（发送ticket、用户取消授权推送）
  .post('/event', service.eventProxy)


  /**********************************************************
   *                      代公众号实现业务                     *
   **********************************************************/
   /*!
    *【消息与菜单权限集】
    *
    * 消息/事件 接收
    */
  .post('/msg/:appid', service.msgProxy)

  /*!
   *【账号管理权限集】
   *
   * 获取公众帐号基础信息(头像昵称/帐号类型等)
   */
  .get('/srv/account/info/:appid', function *() {
    var appid = this.params.appid;
    if (appid) {
      this.body = yield service.srvAccountInfo(appid);
    } else {
      this.body = '获取帐号信息失败，appid缺失。'
    }
  })

/**
 * Expose `OAuth`.
 */
exports = module.exports = router;
