<template>
  <div id="app">
    <Navbar :isLoggedIn="isLoggedIn" @logout="logoutHandler" />
    <!-- Other content -->
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import './index.css';

export default {
  components: {
    Navbar
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  methods: {
    loginHandler() {
      this.isLoggedIn = true;
    },
    logoutHandler() {
      this.isLoggedIn = false;
    }
  }
};
</script>

<style>
/* Your styles */
</style>
