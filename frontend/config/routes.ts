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
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/',
    redirect: '/tools/qrcode',
  },
  {
    component: './404',
  },
];
