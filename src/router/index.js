import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import LoginView from '../views/LoginView.vue';

const routes = [
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: LoginView}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
