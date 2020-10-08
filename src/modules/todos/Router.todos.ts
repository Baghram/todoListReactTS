import React from 'react';

const Routes: any = [
  {
    path: '/todos',
    name: 'Todos',
    component: React.lazy(() => import('modules/todos/Pages/Todos.page')),
  },
];

export default Routes;
