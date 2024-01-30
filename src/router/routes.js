export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/condition/:id',
    name: 'condition',
    component: () => import('@/views/ConditionView.vue'),
  },
];
