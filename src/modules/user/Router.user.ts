import React from 'react';

const Routes: any = [
  {
    path: '/login',
    name: 'Login',
    component: React.lazy(() => import('modules/user/Pages/Login.page')),
  },
];

export default Routes;
