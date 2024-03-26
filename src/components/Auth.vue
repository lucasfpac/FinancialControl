<template>
  <div class="auth-container border border-gray-300 rounded p-4">
    <h2 class="text-2xl font-semibold mb-4">{{ pageTitle }}</h2>

    <form @submit.prevent="handleSubmit">
      <div v-if="isLogin">
        <label for="email" class="block mb-2">Email:</label>
        <input
          type="email"
          v-model="email"
          required
          
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <label for="password" class="block mt-4 mb-2">Password:</label>
        <input
          type="password"
          v-model="password"
          required
          autocomplete
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          class="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
        </button>

        <p class="mt-4">
          Don't have an account?
          <button @click="togglePage" class="text-blue-500">Register</button>
        </p>
      </div>

      <div v-else>
        <label for="name" class="block mb-2">Name:</label>
        <input
          type="text"
          v-model="name"
          required
          autocomplete
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <label for="email" class="block mt-4 mb-2">Email:</label>
        <input
          type="email"
          v-model="email"
          required
          autocomplete
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <label for="password" class="block mt-4 mb-2">Password:</label>
        <input
          type="password"
          v-model="password"
          required
          autocomplete
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />

        <button
          type="submit"
          class="mt-4 bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Register
        </button>

        <p class="mt-4">
          Already have an account?
          <button @click="togglePage" class="text-blue">Login</button>
        </p>
      </div>
    </form>

    <div v-if="errorMessage" class="error-message mt-4">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue";
import router from "../router";

const name = ref("");
const email = ref("");
const password = ref("");
const isLogin = ref(true);
const pageTitle = ref("Login");
const errorMessage = ref("");

const handleSubmit = async () => {
  console.log("handleSubmit function called.");

  try {
    const requestData = {
      email: email.value,
      senha: password.value,
    };

    if (!isLogin.value) {
      requestData.name = name.value;
    }

    const response = await fetch(
      isLogin.value ? "/api/login" : "/api/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      const token = responseData.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("tokenExpiration", Date.now() + 10 * 60 * 1000); // 10 minutes expiration
      name.value = "";
      email.value = "";
      password.value = "";

      // Emit the login event when login is successful
      if (isLogin.value) {
        router.push("/"); // Redirect to home page after successful login
      } else {
        togglePage();
      }

      console.log("Login successful. Emitting login event...");

      // Check if the component instance exists before emitting
      const instance = getCurrentInstance();
      if (instance) {
        instance.emit("login");
      }
    } else {
      const responseData = await response.json();
      errorMessage.value =
        responseData.error ||
        (isLogin.value ? "Login failed" : "Registration failed");
    }
  } catch (error) {
    console.error("Error:", error);
    errorMessage.value = isLogin.value
      ? "An error occurred during login"
      : "An error occurred during registration";
  }
};

const togglePage = () => {
  console.log("Toggling login/register page.");
  isLogin.value = !isLogin.value;
  pageTitle.value = isLogin.value ? "Login" : "Register";
  errorMessage.value = "";
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
