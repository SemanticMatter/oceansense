import { createRouter, createWebHistory } from 'vue-router';
import IndexView from '../views/IndexView.vue';
import NodeView from '../views/NodeView.vue';
import ApiView from '../views/ApiView.vue';
import DatadocView from '../views/DatadocView.vue';

const routes = [
  { path: '/', name: 'index', component: IndexView },
  { path: '/node', name: 'node', component: NodeView },
  { path: '/api_view', name: 'api_view', component: ApiView },
  { path: '/datadoc', name: 'datadoc', component: DatadocView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
