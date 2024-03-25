<template>
  <div class="home bg-gray-900 text-white flex flex-col h-full">
    <h1 class="text-3xl font-bold mb-6">Financial Dashboard</h1>
    
    <!-- Placeholder elements for financial data -->
    <div class="overview bg-gray-800 p-4 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-2">Overview</h2>
      <!-- Placeholder for summary of financial data -->
      <p>This section could display summary information about your finances.</p>
    </div>

    <div class="charts bg-gray-800 p-4 rounded-lg mb-6">
      <h2 class="text-xl font-semibold mb-2">Charts</h2>
      <!-- Placeholder for financial charts (e.g., line chart, pie chart) -->
      <p>This section could display charts visualizing your financial data.</p>
    </div>

    <div class="transactions bg-gray-800 p-4 rounded-lg flex-grow">
      <h2 class="text-xl font-semibold mb-2">Recent Transactions</h2>
      <!-- Placeholder for a list of recent financial transactions -->
      <p>This section could display a list of your recent financial transactions.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  // You can add component-specific data, methods, etc. here
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
