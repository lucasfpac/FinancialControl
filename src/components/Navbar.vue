<template>
  <nav class="bg-gray-800 p-4">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="text-white font-semibold">Home</router-link>
        </div>
        <span v-if="isLoggedIn && userName" class="text-white">Welcome {{ userName }}!</span>
        <div class="flex items-center space-x-4">
          <router-link v-if="isLoggedIn" :to="`/profile`">
            <img v-if="userFoto !== ''" :src="userFoto" class="w-8 h-8 rounded-full" alt="User Avatar" />
            <img v-else src="../assets/profile.jpg" class="w-8 h-8 rounded-full" alt="Default Avatar" />
          </router-link>

          <button v-if="isLoggedIn" @click="logout" class="text-white font-semibold">Logout</button>
          <router-link v-else to="/login" class="text-white font-semibold">Login</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref } from "vue";
import router from "../router";

export default {
  setup() {
    const isLoggedIn = ref(false);
    const userName = ref("");
    const userFoto = ref("");

    // Check if user is already logged in
    const token = sessionStorage.getItem("token");
    if (token) {
      isLoggedIn.value = true;
      const userData = sessionStorage.getItem("user");
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user) {
            userName.value = user.nome;
            console.log("nome", user.nome);

            if (user.fotoURL) {
              userFoto.value = fotoURL;
              console.log("foto", user.fotoURL);
            }else{
              console.log("sem foto");
            }
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    }

    const logout = () => {
      // Clear user data and logout
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("tokenExpiration");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("nome");
      sessionStorage.removeItem("email");
      sessionStorage.removeItem("foto");
      sessionStorage.removeItem("isAuthenticated");

      // Update login status
      isLoggedIn.value = false;

      // Redirect to login page
      router.push("/login");
    };

    return {
      isLoggedIn,
      userName,
      userFoto,
      logout,
    };
  },
};
</script>
