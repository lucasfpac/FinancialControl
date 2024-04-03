<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-semibold mb-6 text-center m-4">
      Transaction List
    </h1>
    <!-- Search bar -->
    <div class="flex justify-between mb-4">
      <!-- Date filters -->
      <div>
        <label for="startDate" class="mr-2">Start Date:</label>
        <input
          v-model="startDate"
          id="startDate"
          type="date"
          class="border rounded-md px-2 py-1 mr-2"
        />
      </div>
      <div>
        <label for="endDate" class="mr-2">End Date:</label>
        <input
          v-model="endDate"
          id="endDate"
          type="date"
          class="border rounded-md px-2 py-1 mr-2"
        />
      </div>
      <!-- Search bar -->
      <div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="border rounded-md px-2 py-1 mr-2"
        />
        <button
          @click="search"
          class="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
    <!-- table code -->
    <h1 class="text-2xl font-semibold mb-6 text-center m-4">
      Transaction List
    </h1>
    <div class="overflow-x-auto">
      <table
        class="min-w-full bg-slate-600 rounded-sm overflow-hidden shadow-md"
      >
        <thead class="bg-gray-800 rounded-sm text-white">
          <tr>
            <th @click="sortBy('descricao')" class="px-4 py-2 cursor-pointer">
              Description
            </th>
            <th @click="sortBy('valor')" class="px-4 py-2 cursor-pointer">
              Amount
            </th>
            <th @click="sortBy('category_id')" class="px-4 py-2 cursor-pointer">
              Category
            </th>
            <th @click="sortBy('data')" class="px-4 py-2 cursor-pointer">
              Date
            </th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <!-- Iterate through sorted transactions and display each row -->
          <tr
            v-for="transaction in sortedTransactions"
            :key="transaction.id"
            class="text-white"
          >
            <!-- Columns for transaction data -->
            <td class="border px-4 py-2">
              <template v-if="!transaction.editing">{{
                transaction.descricao
              }}</template>
              <template v-else>
                <input
                  v-model="transaction.descricao"
                  type="text"
                  class="w-full border rounded-md px-2 py-1"
                />
              </template>
            </td>
            <td class="border px-4 py-2">
              <template v-if="!transaction.editing">{{
                formatAmount(transaction.valor)
              }}</template>
              <template v-else>
                <input
                  v-model.number="transaction.valor"
                  type="number"
                  class="w-full border rounded-md px-2 py-1"
                />
              </template>
            </td>
            <td class="border px-4 py-2">
              <template v-if="!transaction.editing">{{
                getCategory(transaction.category_id)
              }}</template>
              <template v-else>
                <select
                  v-model="transaction.category_id"
                  class="w-full border rounded-md px-2 py-1"
                >
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.nome }}
                  </option>
                </select>
              </template>
            </td>
            <td class="border px-4 py-2">
              <template v-if="!transaction.editing">{{
                formatDate(transaction.data)
              }}</template>
              <template v-else>
                <input
                  v-model="transaction.data"
                  type="date"
                  class="w-full border rounded-md px-2 py-1"
                />
              </template>
            </td>
            <!-- Actions column -->
            <td class="border px-4 py-2 flex space-x-2">
              <button
                @click="toggleEdit(transaction)"
                class="bg-blue-500 text-white py-1 px-3 rounded-lg hover:bg-blue-600"
              >
                {{ transaction.editing ? "Save" : "Edit" }}
              </button>
              <!-- Delete Button -->
              <button
                @click="deleteTransaction(transaction.id)"
                class="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex justify-end mt-4">
      <p class="text-lg font-semibold">
        Total amount available: {{ formatAmount(totalAmountAvailable) }}
      </p>
    </div>
    <!-- TransactionModal component -->
    <TransactionModal :isVisible="showModal" @close="showModal = false" />
    <PieChart :data="transactions" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import TransactionModal from "./TransactionModal.vue";
import PieChart from "./PieChart.vue";

const searchQuery = ref("");
const startDate = ref("");
const endDate = ref("");

// Refs for data
const showModal = ref(false);
const transactions = ref([]);
const categories = ref([]);
const sortColumn = ref("data");
const sortOrder = ref("asc");

// Function to fetch transactions from the API
const fetchTransactions = async () => {
  try {
    const userId = sessionStorage.getItem("userId");
    const response = await axios.get(`/api/transactions/user_id/${userId}`);
    transactions.value = response.data.map((transaction) => ({
      ...transaction,
      editing: false,
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};

// Function to fetch categories from the API
const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/categories");
    categories.value = response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Fetch transactions and categories from API on component mount
onMounted(async () => {
  await fetchTransactions();
  await fetchCategories();
});

// Function to get category name based on category ID
const getCategory = (categoryId) => {
  const category = categories.value.find((cat) => cat.id === categoryId);
  return category ? category.nome : "N/A";
};

// Function to toggle editing mode for a transaction
const toggleEdit = async (transaction) => {
  if (transaction.editing) {
    try {
      // Format date to 'YYYY-MM-DD'
      transaction.data = transaction.data.split("T")[0];

      // Send a PUT request to update the transaction
      await axios.put(`/api/transactions/${transaction.id}`, transaction);
      transaction.editing = false; // Disable editing mode after successful update
    } catch (error) {
      console.error("Error updating transaction:", error);
    }
  } else {
    transaction.editing = true; // Enable editing mode when clicking edit button
  }
};

// Function to delete a transaction
const deleteTransaction = async (transactionId) => {
  try {
    // Send a request to delete the transaction with the given ID
    await axios.delete(`/api/transactions/${transactionId}`);
    // Remove the transaction from the list
    transactions.value = transactions.value.filter(
      (transaction) => transaction.id !== transactionId
    );
  } catch (error) {
    console.error("Error deleting transaction:", error);
  }
};

// Function to format amount with Euro sign
const formatAmount = (amount) => {
  return `€${amount}`;
};

// Function to perform the search
const search = async () => {
  try {
    const response = await axios.post("/api/transactions/search", {
      search: searchQuery.value,
      startDate: startDate.value,
      endDate: endDate.value,
    });
    transactions.value = response.data.map((transaction) => ({
      ...transaction,
      editing: false,
    }));
  } catch (error) {
    console.error("Error searching transactions:", error);
  }
};

// Computed property to calculate total amount for Receita transactions
const totalReceita = computed(() => {
  let total = 0;
  transactions.value.forEach((transaction) => {
    const category = categories.value.find(
      (cat) => cat.id === transaction.category_id
    );
    if (category && category.tipo === "RECEITA") {
      total += parseFloat(transaction.valor);
    }
  });
  // console.log("Receita Transactions:", total);
  return total;
});

// Computed property to calculate total amount for Despesa transactions
const totalDespesa = computed(() => {
  let total = 0;
  transactions.value.forEach((transaction) => {
    const category = categories.value.find(
      (cat) => cat.id === transaction.category_id
    );
    if (category && category.tipo === "DESPESA") {
      total += parseFloat(transaction.valor);
    }
  });
  // console.log("Despesa Transactions:", total);
  return total;
});

// Computed property to calculate total amount available
const totalAmountAvailable = computed(() => {
  const receita = parseFloat(totalReceita.value);
  const despesa = parseFloat(totalDespesa.value);

  if (!isNaN(receita) && !isNaN(despesa)) {
    return receita - despesa;
  } else {
    return 0;
  }
});

// Function to format date as DD/MM/YYYY
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to sort transactions by column
const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortOrder.value = "asc";
  }

  transactions.value.sort((a, b) => {
    let comparison = 0;
    const aValue = a[column];
    const bValue = b[column];

    if (aValue > bValue) {
      comparison = 1;
    } else if (aValue < bValue) {
      comparison = -1;
    }

    return sortOrder.value === "desc" ? comparison * -1 : comparison;
  });
};

// Computed property to return sorted transactions
const sortedTransactions = computed(() => {
  return transactions.value;
});
</script>
