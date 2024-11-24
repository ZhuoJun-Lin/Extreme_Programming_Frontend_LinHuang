import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/',redirect: '/manager/employee'},
    {path: '/manager', component: () => import("../views/Manager.vue"), children: [
        {path: 'ceshi', meta:{ title: "测试空页面" }, component: () => import('../views/Ceshi.vue')},
        {path: 'employee', meta:{ title: "主页信息" }, component: () => import('../views/Employee.vue')},

        ]},
    {path: '/404', name: 'NotFound',meta:{ title: "404找不到页面" }, component: () => import('../views/404.vue')},
    {path: '/:pathMatch(.*)', redirect: '/404' },
  ]
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router
