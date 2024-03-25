<template>
<nav class="bg-gray-800 p-4">
  <div class="max-w-7xl mx-auto flex justify-between items-center">
    <!-- Logo -->
    <div class="flex items-center">
      <span class="text-white text-lg font-semibold">Dashboard</span>
    </div>

    <!-- Navigation Links -->
    <div class="hidden md:flex space-x-4">
      <router-link to="/home" class="text-white hover:text-gray-300">Home</router-link>
      <router-link to="/invoices" class="text-white hover:text-gray-300">Invoices</router-link>
      <router-link to="/sales" class="text-white hover:text-gray-300">Sales</router-link>
      <router-link to="/reports" class="text-white hover:text-gray-300">Reports</router-link>
      <router-link to="/About" class="text-white hover:text-gray-300">about</router-link>
      

      <!-- Conditional Log Out/Log In Link -->
      <template v-if="isLoggedIn">
      <!-- Display logout link -->
      <router-link to="/logout" class="text-white hover:text-gray-300">Logout</router-link>
      </template>
      <template v-else>
        <!-- Display login link -->
        <router-link to="/login" class="text-white hover:text-gray-300">Login</router-link>
      </template>
    </div>

    <!-- Mobile Menu Button (hidden on larger screens) -->
    <div class="md:hidden">
      <button class="text-white focus:outline-none">
        <!-- Hamburger Icon -->
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>
    </div>
  </div>
</nav>

  </template>
<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    }
  }
}
</script>