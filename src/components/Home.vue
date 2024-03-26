<template>
  <div class="home bg-gray-900 text-white flex flex-col h-full">
    <h1 class="text-3xl font-bold mb-6 text-center m-2">Financial Dashboard</h1>
    
    <!-- Placeholder elements for financial data -->
    <div class="overview bg-gray-800 p-4 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-2">Overview</h2>
      <!-- Placeholder for summary of financial data -->
      <p>This section displays summary information about your finances.</p>
      <br>
      <img src="../assets/dashboard.png">

    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'Home',
  setup() {
    // Add any reactive variables or methods specific to this component
    // For example:
    const someData = ref('Some data');

    return {
      someData
    };
  }
}
</script>

<style scoped>
/* Override global width restrictions */
.home {
  width: 100%;
}

/* If the navbar is a separate component, apply similar styles */
.navbar {
  width: 100%;
}
</style>
