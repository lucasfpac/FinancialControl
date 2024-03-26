<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-semibold mb-6 text-center m-4">Transaction List</h1>
    <table class="min-w-full bg-slate-600  rounded-sm overflow-hidden shadow-md">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="px-4 py-2">ID</th>
          <th class="px-4 py-2">Description</th>
          <th class="px-4 py-2">Amount</th>
          <th class="px-4 py-2">Category</th>
          <th class="px-4 py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        <!-- Iterate through transactions and display each row -->
        <tr
          v-for="transaction in transactions"
          :key="transaction.id"
          class="text-white"
        >
          <td class="border px-4 py-2">{{ transaction.id }}</td>
          <td class="border px-4 py-2">{{ transaction.descricao }}</td>
          <td class="border px-4 py-2">{{ transaction.valor }}</td>
          <td class="border px-4 py-2">{{ transaction.category }}</td>
          <td class="border px-4 py-2">{{ transaction.data }}</td>
        </tr>
      </tbody>
    </table>
    <!-- AddTransactionModal component -->
    <AddTransactionModal :isVisible="showModal" @close="showModal = false" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import AddTransactionModal from "./AddTransactionModal.vue";

const showModal = ref(false);
const transactions = ref([]);

// Fetch transactions from API on component mount
onMounted(async () => {
  try {
    const response = await axios.get("/api/transactions");
    transactions.value = response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
});
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

table {
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 10px;
}

button {
  display: block;
  margin-left: auto;
}
</style>
