qm-wechat
===========

千米微信第三方平台应用

http://wechat.qianmi.com

## TOKEN
- component_access_token
  第三方平台令牌，主要用于获取预授权码pre_auth_code  ***【有效期2小时，不能刷新】***

- authorizer_access_token  
  授权方公众号token，用于代替公众号访问API ***【有效期2小时，可以刷新】***

- authorizer_refresh_token
  用于刷新授权方令牌，避免重新授权。
  请妥善保存，一旦丢失，只能让用户重新授权，才能再次拿到新的刷新令牌

## 主要步骤
- 1、获取微信推送给第三方平台的component_verify_ticket（十分钟推送一次），获取后 ***缓存到redis***；

- 2、拿component_verify_ticket换取第三方平台component_access_token（有效期2小时），***缓存到redis***，
     不能刷新，每次从缓存获取时判断过期时间，提前重新获取；

- 3、拿component_access_token换取预授权码pre_auth_code。授权码的获取，需要在用户在
     第三方平台授权页中完成授权流程后，在回调URI中通过URL参数提供给第三方平台方（有效期十分钟）

- 4、使用pre_auth_code换取授权公众号的授权信息，并换取authorizer_access_token和
     authorizer_refresh_token（有效期2小时），***缓存到redis***，每次使用时检测token的有效期，到期后刷新；

- 5、使用authorizer_access_token访问公众号API
