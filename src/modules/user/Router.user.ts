import React from 'react';

const Routes: any = [
  {
    path: '/login',
    name: 'Login',
    component: React.lazy(() => import('modules/user/Pages/Login.page')),
  },
  {
    path: '/register',
    name: 'Register',
    component: React.lazy(() => import('modules/user/Pages/Register.page')),
  },
];

export default Routes;
