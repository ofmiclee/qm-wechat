/**
 * 应用
 * @author MicLee OF578
 * @date 2015-07-10
 */

var app = require('koa')();
var router = require('./lib/router');
var logger = require('koa-logger');
var serve = require('koa-static');

app
  .use(serve(__dirname + '/static'))
  .use(logger())
  .use(router.routes())
  // .use(router.allowedMethods())
  .listen(8080);
console.log('server is running at http://localhost:8080');
