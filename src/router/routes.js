export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/charts-and-reports',
    name: 'charts-and-reports',
    component: () => import('@/views/ChartsAndReportsView.vue'),
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
