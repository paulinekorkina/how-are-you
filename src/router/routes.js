export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/condition/:id',
    name: 'condition',
    component: () => import('@/views/ConditionEdit.vue'),
  },
  {
    path: '/condition/create',
    name: 'condition-create',
    component: () => import('@/views/ConditionCreate.vue'),
  },
];
