/**
 * 业务服务
 * @author MicLee OF578
 */

"use strict";

/**
 * redis key
 */
const PLATFORM_TICKET_KEY = 'qianmi.wechat.platform.ticket';

const PLATFORM_TOKEN_KEY = 'qianmi.wechat.platform.token';

/**
 * KEY:AUTHORIZER_TOKEN_KEY field:APPID(授权公众号APPID)
 */
const AUTHORIZER_TOKEN_KEY = 'qianmi.wechat.authorizer.token';

/**
* Module dependencies.
*/
var OAuth = require('wechat-platform').OAuth;
var Event = require('wechat-platform').Message;
var ComponentToken = require('wechat-platform').ComponentToken;
var AuthorizerToken = require('wechat-platform').AuthorizerToken;
var RedisCo = require('./redisCo');
var config = require('./config');

var redisClient = RedisCo(config.redis).client;
var oAuth = OAuth(config.wechat);

/**
 * _标示私有方法 获取第三方平台token
 *
 * result: ComponentToken对象里的access_token
 */
var _getComponentToken = function *() {
  var tokenData = JSON.parse(yield redisClient.get(PLATFORM_TOKEN_KEY));
  console.log("=========tokenData-redis============");
  console.log(tokenData);

  if(tokenData) {
    let componentToken = ComponentToken(tokenData);
    if (componentToken.isValid()) {
      return componentToken.data.access_token;
    }
  }

  var ticket = yield redisClient.get(PLATFORM_TICKET_KEY);
  tokenData = yield oAuth.getComponentToken(ticket);
  console.log("=========tokenData-weixin============");
  console.log(tokenData);

  var result = ComponentToken(tokenData);
  redisClient.set(PLATFORM_TOKEN_KEY, JSON.stringify(result.data));

  return result.data.access_token;
}

/**
 * 授权者请求授权
 */
exports.oAuthReq = function *() {
  var componentToken = yield _getComponentToken();
  //跳转微信授权页面 发起授权  在回调页面获取预授权码
  var codeData = yield oAuth.createPreAuthCode(componentToken);
  console.log("=========code============");
  console.log(codeData.pre_auth_code);

  this.body = yield oAuth.getOAuthURL(codeData.pre_auth_code, 'http://wechat.qianmi.com/oauth/code');
}

/**
 * 微信请求授权回调返回code，回调后直接请求获取token
 */
exports.oAuthCode = function *() {
  var query = this.query;
  console.log("=========oAuthCode-queryString============");
  console.log(query);

  if (query.auth_code) {
    var componentToken = yield _getComponentToken();
    var authorizerTokenData = yield oAuth.getAuthorizerToken(componentToken, query.auth_code);
    var authorizerToken = new AuthorizerToken(authorizerTokenData);
    redisClient.hset(AUTHORIZER_TOKEN_KEY, authorizerToken.data.appid, JSON.stringify(authorizerToken.data));

    this.body = "授权成功！AuthorizerToken:" + JSON.stringify(authorizerToken.data);
  }
}

/**
 * 获取授权者的的access_token
 */
exports.getAuthorizerToken = function *(authAppid) {
  var tokenData = JSON.parse(yield redisClient.hget(AUTHORIZER_TOKEN_KEY, authAppid));
  if(tokenData) {
    var authorizerToken = AuthorizerToken(tokenData);
    if (authorizerToken.isValid()) {
      return authorizerToken.data.access_token;
    }

    //如果失效了，刷新
    var refrshToken = authorizerToken.data.refresh_token;
    var componentToken = yield _getComponentToken();
    var data = yield oAuth.refreshAuthorizerToken(componentToken, authAppid, refrshToken);
    //TODO data正确性验证
    console.log("============refreshAuthorizerToken============");
    console.log(data);

    //更新redis数据
    tokenData.access_token = data.authorizer_access_token;
    tokenData.refresh_token = data.authorizer_refresh_token;
    tokenData.create_time =  new Date().getTime();
    yield redisClient.hset(AUTHORIZER_TOKEN_KEY, authAppid, JSON.stringify(tokenData));
    return tokenData.access_token;

  } else { //如果没有是无法重新获取的，只能用户重新授权
    throw new Error('没有存储授权者token信息，或者信息丢失，需公众号重新授权。');
  }
}

/**
 * 刷新授权者的的access_token（测试用，实际情况下不用主动调用）
 */
exports.refreshToken = function *(authAppid) {
  var tokenData = JSON.parse(yield redisClient.hget(AUTHORIZER_TOKEN_KEY, authAppid));
  if(tokenData) {
    var authorizerToken = AuthorizerToken(tokenData);

    //如果失效了，刷新
    var refreshToken = authorizerToken.data.refresh_token;
    var componentToken = yield _getComponentToken();
    var data = yield oAuth.refreshAuthorizerToken(componentToken, authAppid, refreshToken);
    //TODO data正确性验证
    console.log("============refreshAuthorizerToken============");
    console.log(data);

    //更新redis数据
    tokenData.access_token = data.authorizer_access_token;
    tokenData.refresh_token = data.authorizer_refresh_token;
    tokenData.create_time =  new Date().getTime();
    yield redisClient.hset(AUTHORIZER_TOKEN_KEY, authAppid, JSON.stringify(tokenData));
    return tokenData.access_token;

  } else { //如果没有是无法重新获取的，只能用户重新授权
    throw new Error('没有存储授权者token信息，或者信息丢失，需公众号重新授权。');
  }
}

/**
 * 微信推送的“事件/消息”代理
 */
exports.eventProxy = Event(config.wechat).proxy(function *(){
  var info = this.weixin;

  console.log("===========event===info=============");
  console.log(info);
  if(info.InfoType = 'component_verify_ticket') {
    //存入缓存
    redisClient.set(PLATFORM_TICKET_KEY, info.ComponentVerifyTicket);
  }

  this.body = 'success';
})

/**********************************************************
 *                      代公众号实现业务                     *
 **********************************************************/
/*!
 *【消息与菜单权限集】
 *
 * 消息/事件 接收
 */
exports.msgProxy = function *() {
  this.body = 'success';
}

/*!
 *【账号管理权限集】
 *
 * 获取公众帐号基础信息(头像昵称/帐号类型等)
 */
exports.srvAccountInfo = function *() {
  var query = this.query;
  if (query.appid) {
    this.body = yield service.getAuthorizerToken(query.appid);
  } else {
    this.body = '获取用户账户信息失败，appid缺失。'
  }
}
