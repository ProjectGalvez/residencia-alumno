import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { LocalStorage } from 'quasar';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    const user = LocalStorage.getItem('user');
    const userData = JSON.parse(user);

    if (to.meta.requiresAuth && !userData) {
      next('/login');
    } else if (to.meta.roles && to.meta.roles.length > 0) {
      if (userData && userData.role) {
        const userRoles = userData.role;
        const hasRole = userRoles.some((role) => to.meta.roles.includes(role));
        if (!hasRole) {
          next('/403');
        } else {
          next();
        }
      } else {
        next('/403');
      }
    } else if (to.path === '/login') {
      if (userData) {
        // Si el usuario ya está logeado, redirige según su rol
        if (userData.role.includes('admin')) {
          next('/dashboard');
        } else if (userData.role.includes('capturista')) {
          next('/dashboard');
        } else if (userData.role.includes('estudiante')) {
          next('/administracion');
        } else {
          next('/not-found');
        }
      } else {
        next();
      }
    } else {
      next();
    }
  });

  return Router;
});
