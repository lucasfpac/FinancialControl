<template>
  <div id="app">
    <Navbar :isLoggedIn="isLoggedIn" @logout="logoutHandler" />
    <!-- Other content -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import router from './router'; // Import your router instance
import Navbar from './components/Navbar.vue';
import './index.css';


const isLoggedIn = ref(false);

const loginHandler = () => {
  isLoggedIn.value = true;
  // Optionally, you can also redirect the user to the home page after login
  // router.push('/home');
};

const logoutHandler = () => {
  isLoggedIn.value = false;
  // Optionally, you can also redirect the user to the login page after logout
  // router.push('/login');
};

onMounted(() => {
  // Listen for the login event emitted by the Auth component
  // and update the isLoggedIn value
  const authComponent = document.querySelector('#auth-component');
  if (authComponent) {
    authComponent.addEventListener('login', loginHandler);
  }

  // Redirect the user to the home page if already logged in
  if (isLoggedIn.value) {
    router.push('/home');
  }
});
</script>

<style>
/* Your styles */
</style>
