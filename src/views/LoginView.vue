<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-6">{{ pageTitle }}</h1>
    
    <form v-if="page === 'login'" @submit.prevent="login" class="w-full max-w-sm">
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-semibold mb-2">Email:</label>
        <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required autocomplete>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-semibold mb-2">Password:</label>
        <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required autocomplete="current-password">
      </div>
      <button type="submit" class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Login</button>
    </form>
    
    <form v-else @submit.prevent="register" class="w-full max-w-sm">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-semibold mb-2">Name:</label>
        <input type="text" id="name" v-model="name" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required autocomplete>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-semibold mb-2">Email:</label>
        <input type="email" id="email" v-model="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required autocomplete>
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-700 font-semibold mb-2">Password:</label>
        <input type="password" id="password" v-model="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" required autocomplete="new-password">
      </div>
      <button type="submit" class="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600">Register</button>
    </form>
    
    <div v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</div>
    
    <div class="mt-4">
      <span v-if="page === 'login'">Don't have an account? <button @click="togglePage('register')" class="text-indigo-500">Register</button></span>
      <span v-else>Already have an account? <button @click="togglePage('login')" class="text-indigo-500">Login</button></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Auth',
  data() {
    return {
      page: 'login',
      pageTitle: 'Login',
      name: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            senha: this.password
          })
        });

        if (response.ok) {
          // Successful login, redirect or perform any necessary actions
          console.log('Login successful!');
           // Emit login event
          this.$emit('login');
        } else {
          // Handle error response
          const responseData = await response.json();
          this.errorMessage = responseData.error || 'Login failed';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred during login';
      }
    },
    async register() {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome: this.name,
            email: this.email,
            senha: this.password
          })
        });

        if (response.ok) {
          // Successful registration, redirect or perform any necessary actions
          console.log('Registration successful!');
        } else {
          // Handle error response
          const responseData = await response.json();
          this.errorMessage = responseData.error || 'Registration failed';
        }
      } catch (error) {
        console.error('Error:', error);
        this.errorMessage = 'An error occurred during registration';
      }
    },
    logout() {
      // Perform logout actions
      this.$emit('logout');
    },
    togglePage(page) {
      this.page = page;
      this.pageTitle = page === 'login' ? 'Login' : 'Register';
    }
  }
};
</script>


<style>
/* Add your custom styles here */
</style>
