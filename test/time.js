
var data = {
  access_token: 'z3-3gkAKCvfGEpSw6QoLe5g0Yhv_l-gF1nJiUyq7Q3UA_FbhmkSXIzEkAxZGBpxPQIWHa74tk7BUtB40iPHsq1k5fX11TYDco1q79iJoE6Q',
  expires_in: 7200,
  create_time: 1438770838745
}
var flag = !!data.access_token && (new Date().getTime()) < (data.create_time + data.expires_in * 1000);

console.log("======================" + flag);
