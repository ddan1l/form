import VueRouter from "vue-router";

const routes = [
    {
        name: 'Form',
        path: '/callback/:sort',
        props: true,
        component: () => import('./components/callback-form')
    },
    {
        name: 'Home',
        path: '/',
        component: () => import('./components/home')
    },
    {
        name: 'List',
        path: '/list',
        component: () => import('./components/list')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router