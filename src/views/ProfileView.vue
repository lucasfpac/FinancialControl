<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <h2 class="text-2xl font-semibold mb-4">Profile</h2>
      
      <div class="flex items-center space-x-4">
        <div>
          <img src="../assets/profile.jpg"  class="w-32 h-32 rounded-full" alt="User Avatar" />
        </div>
        <div>
          <p class="text-lg font-semibold"> Name: {{ userName }}</p>
          <p class="text-lg font-semibold"> E-mail: {{ userEmail }}</p>
        </div>
      </div>
    </div>
  </template>
  

<script>
import { ref } from "vue";

export default {
  name: "profile",
  setup() {
    const userName = ref("");
    const userEmail = ref("");
    const userData = sessionStorage.getItem("user");
    const fotoURL = sessionStorage.getItem("fotoURL")
    console.log(fotoURL);
    try {
      const user = JSON.parse(userData);
      if (user) {
        userName.value = user.nome;
        userEmail.value = user.email;
        console.log("nome", user.nome);
        console.log("email", user.email);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return {
      userName,
      userEmail,
      fotoURL
    };
  },
};
</script>
