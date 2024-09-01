import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue'

const routes = [
    { 
        path: '/', 
        component: HomeView,
        meta: {
            title: "David Mikulić",
        }
    },

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior (to, from, savedPosition) {
      if (to.hash) {
        return {
          el: to.hash,
          behavior: 'smooth',
        }
      } else if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0, behavior: 'smooth' };
      }
    }
  });
  
  router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
      document.title = to.meta.title;
    } else {
      document.title = 'David Mikulić';
    }
    next();
  });
  
  export default router;