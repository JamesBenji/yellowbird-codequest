<!-- eslint-disable linebreak-style -->
<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>

    <!-- 🔹 Total Revenue -->
    <div class="bg-purple-100 p-4 rounded shadow mb-6">
      <h2 class="text-xl font-semibold">Total Revenue</h2>
      <p class="text-3xl font-bold">${{ dashboardStore.totalRevenue.toFixed(2) }}</p>
    </div>

    <!-- 🔹 Sales Trends Chart -->
    <div class="bg-gray-100 p-4 rounded shadow mb-6">
      <h2 class="text-xl font-semibold">Sales Trends</h2>
      <LineChart
        :chart-data="{
          labels: dashboardStore.salesTrends.map((s) => s.date),
          datasets: [
            {
              label: 'Revenue',
              data: dashboardStore.salesTrends.map((s) => s.revenue),
              borderColor: 'blue'
            }
          ]
        }"
      />
    </div>

    <!-- 🔹 Top-Selling Products -->
    <div class="bg-gray-100 p-4 rounded shadow">
      <h2 class="text-xl font-semibold">Top-Selling Products</h2>
      <PieChart
        :chart-data="{
          labels: dashboardStore.topSellingProducts.map((p) => p.name),
          datasets: [
            {
              data: dashboardStore.topSellingProducts.map((p) => p.sales),
              backgroundColor: ['red', 'blue', 'green']
            }
          ]
        }"
      />
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Total Orders</h2>
        <p class="text-3xl font-bold">{{ dashboardStore.totalOrders }}</p>
      </div>

      <div class="bg-yellow-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Pending Orders</h2>
        <p class="text-3xl font-bold">{{ dashboardStore.pendingOrders }}</p>
      </div>

      <div class="bg-blue-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Shipped Orders</h2>
        <p class="text-3xl font-bold">{{ dashboardStore.shippedOrders }}</p>
      </div>

      <div class="bg-green-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Delivered Orders</h2>
        <p class="text-3xl font-bold">{{ dashboardStore.deliveredOrders }}</p>
      </div>
    </div>

    <div class="bg-purple-100 p-4 rounded shadow mt-6">
      <h2 class="text-xl font-semibold">Total Revenue</h2>
      <p class="text-3xl font-bold">${{ dashboardStore.totalRevenue.toFixed(2) }}</p>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-6">
      <div class="bg-gray-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Total Products</h2>
        <p class="text-3xl font-bold">{{ dashboardStore.totalProducts }}</p>
      </div>

      <div class="bg-red-100 p-4 rounded shadow">
        <h2 class="text-xl font-semibold">Low Stock Products</h2>
        <p class="text-3xl font-bold">{{ dashboardStore.lowStockProducts }}</p>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable linebreak-style -->

<script setup>
import { onMounted } from 'vue';
import { LineChart, PieChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import useAdminDashboardStore from '../stores/adminDashboard';

Chart.register(...registerables);

const dashboardStore = useAdminDashboardStore();

onMounted(() => {
  dashboardStore.fetchDashboardData();
  dashboardStore.fetchSalesReports();
});
</script>
