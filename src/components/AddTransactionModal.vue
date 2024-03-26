<template>
  <div>
    <!-- Button to open the modal -->
    <button
      @click="openModal"
      class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 m-2"
    >
      Add Transaction
    </button>

    <!-- Modal -->
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center"
    >
      <div class="bg-gray-800 border border-white p-8 rounded-lg shadow-md w-96">
        <h2 class="text-lg font-semibold mb-4">Add Transaction</h2>
        <!-- Form fields to add new transaction -->
        <form @submit.prevent="handleSubmit">
          <!-- Description field -->
          <div class="mb-4">
            <label for="description" class="block">Description:</label>
            <input
              v-model="description"
              type="text"
              id="description"
              class="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <!-- Amount field -->
          <div class="mb-4">
            <label for="amount" class="block">Amount:</label>
            <input
              v-model.number="amount"
              type="number"
              id="amount"
              class="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <!-- Category field -->
          <div class="mb-4">
            <label for="category" class="block">Category:</label>
            <!-- CategoryDropdown component -->
            <CategoryDropdown v-model="selectedCategory" />
          </div>
          <!-- Date field -->
          <div class="mb-4">
            <label for="date" class="block">Date:</label>
            <input
              v-model="date"
              type="date"
              id="date"
              class="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <!-- Form buttons -->
          <div class="text-right mt-4">
            <button
              type="submit"
              class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
            <button
              @click="closeModal"
              type="button"
              class="bg-gray-400 text-white py-2 px-4 rounded-md ml-2 hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import CategoryDropdown from "./CategoryDropdown.vue";

export default {
  components: {
    CategoryDropdown,
  },
  setup() {
    // Refs for form fields and modal visibility
    const isVisible = ref(false);
    const description = ref("");
    const amount = ref(0);
    const selectedCategory = ref("");
    const date = ref("");

    // Function to handle form submission
    const handleSubmit = () => {
      // Logic to add new transaction
    };

    // Function to open modal
    const openModal = () => {
      isVisible.value = true;
    };

    // Function to close modal
    const closeModal = () => {
      isVisible.value = false;
      // Reset form fields
      description.value = "";
      amount.value = 0;
      selectedCategory.value = "";
      date.value = "";
    };

    return {
      isVisible,
      description,
      amount,
      selectedCategory,
      date,
      handleSubmit,
      openModal,
      closeModal,
    };
  },
};
</script>

<style scoped>
/* Your scoped styles */
</style>
