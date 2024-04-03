<template>
  <div id="app">
    <Navbar />
    <!-- Other content -->
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "./router"; // Import your router instance
import Navbar from "./components/Navbar.vue";
import "./index.css";

const isLoggedIn = ref(false);

const logoutHandler = () => {
  isLoggedIn.value = false;
  console.log("User logged out. isLoggedIn:", isLoggedIn.value);
};

onMounted(() => {
  // Redirect the user to the home page if already logged in
  if (isLoggedIn.value) {
    router.push("/");
  }
});
</script>

