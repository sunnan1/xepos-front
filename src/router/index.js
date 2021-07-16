import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Companies from '../views/Companies.vue'
import CompanyProfile from '../views/CompanyProfile.vue'
import Employees from '../views/Employees.vue'
import EmployeeProfile from '../views/EmployeeProfile.vue'
import req from '../apis/request'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: Dashboard,
    meta: { authOnly: true }
  },
  {
    path: '/companies',
    name: 'Companies',
    component: Companies,
    meta: { authOnly: true },
  },
  {
    path: '/company/profile',
    name: 'Company Profile',
    component: CompanyProfile,
    meta: { authOnly: true },
  },
  {
    path: '/employees',
    name: 'Employees',
    component: Employees,
    meta: { authOnly: true }
  },
  {
    path: '/employee/profile',
    name: 'Employee Profile',
    component: EmployeeProfile,
    meta: { authOnly: true }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  req.auth()
  .then(res => {  
     if ((to.matched.some(record => record.meta.guestOnly))) {
        next({
            name: "Dashboard",
        });
      }
      else
      {
        next()
      }
  }).catch(err => {
    if(err.response.status == 401)
    {
      if ((to.matched.some(record => record.meta.authOnly))) {
        next({
            name: "Home",
        });
      }
      else
      {
        next()
      }
    }
});
});

export default router
