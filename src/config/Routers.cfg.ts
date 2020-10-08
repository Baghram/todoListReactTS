/**
 * @author: dwi.setiyadi@gmail.com
 */

import React from 'react'; // eslint-disable-line

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
// import RouterExample from '../modules/example/RouterExample';

import RouterHome from 'modules/home/Router.home';
import RouterUser from 'modules/user/Router.user';
import RouterTodos from 'modules/todos/Router.todos';

export const RouterContainer = [
  // ...RouterExample,
  ...RouterHome,
  ...RouterUser,
  ...RouterTodos,
];

export const RouterNonContainer = [
  // {
  //   path: '/404',
  //   exact: true,
  //   name: '404 Not Found',
  //   component: React.lazy(() => import('../modules/example/views/Pages/Page404/Page404')),
  // },
  // {
  //   path: '/500',
  //   exact: true,
  //   name: '500 Internal Server Error',
  //   component: React.lazy(() => import('../modules/example/views/Pages/Page500/Page500')),
  // },
];

export const DefaultPath = '/home';
