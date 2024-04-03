<template>
  <div class="pie-chart">
    <apexchart
      v-if="dataLoaded"
      type="pie"
      :options="chartOptions"
      :series="chartSeries"
      width="400"
    />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";
import axios from "axios"; // Import axios for API requests

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        chart: {
          type: "pie",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        legend: {
          labels: {
            colors: "#fff", // Set legend label color to white
          },
        },
      },
      chartSeries: [],
      categoryDescriptions: {}, // Object to store category descriptions
      dataLoaded: false, // Flag to track if data is loaded
    };
  },
  async mounted() {
    await this.fetchCategoryDescriptions(); // Fetch category descriptions on component mount
    this.updateChartData(this.data); // Update chart data
  },
  watch: {
    data: {
      handler: "updateChartData",
      immediate: true, // Call the handler immediately on component creation
    },
  },
  methods: {
    async fetchCategoryDescriptions() {
      try {
        const response = await axios.get("/api/categories"); // Assuming this is the endpoint to fetch categories
        // Map category IDs to descriptions
        response.data.forEach((category) => {
          this.categoryDescriptions[category.id] = category.nome; // Assuming "nome" is the description field
        });
        // console.log("Category descriptions:", this.categoryDescriptions); // Log category descriptions
      } catch (error) {
        // console.error("Error fetching category descriptions:", error);
      }
    },

    updateChartData(data) {
      // console.log("Data received:", data); // Add this line to log the received data
      if (!data || data.length === 0) {
        // console.warn("Data is empty or undefined.");
        this.dataLoaded = false; // Set dataLoaded flag to false
        return;
      }

      const categories = {};
      data.forEach((item) => {
        const categoryId = item.category_id;
        if (!categories[categoryId]) {
          categories[categoryId] = 0;
        }
        categories[categoryId] += parseFloat(item.valor); // Parse valor as float
      });

      // Update legend labels
      this.chartOptions.labels = Object.keys(categories).map((categoryId) => {
        return this.categoryDescriptions[categoryId] || categoryId; // Use category description if available, otherwise use ID
      });

      this.chartSeries = Object.values(categories);
      this.dataLoaded = true; // Set dataLoaded flag to true after updating data
    },
  },
};
</script>

<style>
.pie-chart {
  margin: auto;
  text-align: center;
}
</style>
