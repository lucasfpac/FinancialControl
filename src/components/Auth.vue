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
          <button @click="togglePage" class="text-blue-500">Login</button>
        </p>
      </div>
    </form>

    <div v-if="errorMessage" class="error-message mt-4">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, getCurrentInstance } from "vue";
import router from "../router";
import logout from './Navbar.vue'

export default {
  emits: ["login-success"],

  setup(_, context) {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const isLogin = ref(true);
    const pageTitle = ref("Login");
    const errorMessage = ref("");

    const INACTIVITY_TIMEOUT = 10 * 60 * 1000;

    let inactivityTimer;
    let expiration;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(logoutDueToInactivity, INACTIVITY_TIMEOUT);
    };

    const logoutDueToInactivity = () => {
      alert('Logging out due to inactivity');
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
      console.log(isLoggedIn);

      // Redirect to login page
      router.push("/login");
      logout(); // vindo do navbar??
    };

    onMounted(() => {
      resetTimer();
      ["mousemove", "mousedown", "keypress", "touchmove", "scroll"].forEach(
        (event) => {
          window.addEventListener(event, resetTimer, false);
        }
      );
    });

    onUnmounted(() => {
      ["mousemove", "mousedown", "keypress", "touchmove", "scroll"].forEach(
        (event) => {
          window.removeEventListener(event, resetTimer, false);
        }
      );
    });

    const handleSubmit = async () => {
      try {
        expiration = new Date();
        expiration.setTime(expiration.getTime() + INACTIVITY_TIMEOUT);

        sessionStorage.setItem("tokenExpiration", expiration.toISOString());

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

          const { token, userId, nome, email: userEmail, foto } = responseData;

          sessionStorage.setItem("token", token);
          

          //test

          // Inside the handleSubmit function after receiving the API response
          console.log("API Response Data:", responseData);
          console.log("User data before parsing:", responseData);

          // Check if responseData contains user data
          if (responseData) {
            console.log(responseData);
            // Convert Blob data to Blob URL
            const fotoBlob = new Blob([foto], {type: 'image/jpeg'});

            console.log(fotoBlob);
            const fotoURL = URL.createObjectURL(fotoBlob);
            console.log(fotoURL);
            // Store the Blob URL in sessionStorage
            sessionStorage.setItem("fotoURL", fotoURL);

            // Remove the Blob data from responseData to avoid storage quota issues
            delete responseData.foto;

            sessionStorage.setItem("user", JSON.stringify(responseData));

            console.log("User data after parsing:", responseData);
          } else {
            console.error("User data is undefined. Unable to parse.");
          }

          // end test
          const expiration = new Date();
          expiration.setMinutes(expiration.getMinutes() + 10);
          sessionStorage.setItem("tokenExpiration", expiration.toISOString());

          sessionStorage.setItem("userId", userId);
          sessionStorage.setItem("nome", nome);
          sessionStorage.setItem("email", userEmail);
          // Do not store foto here anymore
          sessionStorage.setItem("isAuthenticated", "true");
          // Inside the handleSubmit function after saving user data to sessionStorage
          console.log("User data saved to sessionStorage:", responseData.user);

          router.push("/");

          name.value = "";
          email.value = "";
          password.value = "";
          errorMessage.value = "";

          console.log(
            "Login successful. User information saved in sessionStorage."
          );
          // Emit login success event with user data
          const userData = { userId, nome, email: userEmail, foto };
          context.emit("login-success", userData);
        } else {
          console.error("Login failed. Status:", response.status);
          const responseData = await response.json();
          errorMessage.value =
            responseData.message ||
            (isLogin.value ? "Login failed" : "Registration failed");

          email.value = "";
          password.value = "";
        }
      } catch (error) {
        console.error("Error:", error);
        errorMessage.value = isLogin.value
          ? "An error occurred during login"
          : "An error occurred during registration";
      }
    };

    const togglePage = () => {
      isLogin.value = !isLogin.value;
      pageTitle.value = isLogin.value ? "Login" : "Register";
      errorMessage.value = "";
    };

    return {
      name,
      email,
      password,
      isLogin,
      pageTitle,
      errorMessage,
      handleSubmit,
      togglePage,
    };
  },
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
