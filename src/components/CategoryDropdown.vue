<template>
    <select v-model="selectedCategory" @change="handleCategoryChange" class="w-full border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500">
      <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nome }}</option>
      <option value="addNew">Add New Category</option>
    </select>
  </template>
  
  <script setup>
  import { ref, onMounted, provide } from 'vue';
  import axios from 'axios';
  
  // Define props
  const selectedCategory = ref('');
  const categories = ref([]);
  
  // Fetch categories from API on component mount
  onMounted(async () => {
    try {
      const response = await axios.get('/api/categories');
      categories.value = response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  });
  
  // Emit event when selected category changes
  const handleCategoryChange = () => {
    if (selectedCategory.value === 'addNew') {
      emit('addNewCategory');
    }
  };
  </script>
  
  
  <style scoped>
  /* Your scoped styles */
  </style>
  