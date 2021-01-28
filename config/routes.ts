export default [
  {
    path: '/tools/qrcode',
    name: 'qrcode',
    icon: 'qrcode',
    component: './tools/qrcode',
  },
  {
    path: '/tools/json',
    name: 'json',
    icon: 'fileDone',
    component: './tools/json',
  },
  {
    path: '/tools/uuid',
    name: 'uuid',
    icon: 'idcard',
    component: './tools/uuid',
  },
  {
    path: '/tools/crypt',
    name: 'crypt',
    icon: 'creditCard',
    component: './tools/crypt',
  },
  {
    path: '/tools/objectId',
    name: 'objectId',
    icon: 'dingtalk',
    component: './tools/objectId',
  },
  {
    path: '/',
    redirect: '/tools/qrcode',
  },
  {
    component: './404',
  },
];
