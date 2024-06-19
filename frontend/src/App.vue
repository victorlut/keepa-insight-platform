<template>
  <div>
  <!-- Search input and button -->
  <div class="max-w-md mx-auto mt-10">   
    <div class="relative">
      <form method="GET" action="/">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" v-model="code" name="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="What are you looking for?" required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
      </form>
    </div>
    <p class="text-red-600">{{ error }}</p>
    <p class="text-blue-600" v-if="isCache">Cached Product</p>
  </div>

  <h2 class="text-2xl mt-5 pl-5 font-extrabold dark:text-white" v-if="summary">Product Summary</h2>
  <h3 class="text-xl mt-3 pl-10">{{ summary }}</h3>
  <!-- Image and product description -->
  <div class="grid grid-cols-3 mt-10 p-10" v-if="title">
    <!-- Image -->
    <div class="col-span-1 pl-10" v-if="imagesCSV">
      <img class="h-auto max-w-full" :src="imagesCSV[0]" alt="Product Image">
    </div>
    <!-- Product Description -->
    <div class="col-span-2 pl-10 ml-10">
      <h2 class="text-2xl font-extrabold dark:text-white">{{ title }}</h2>
      <h3 class="pl-5 text-xl font-extrabold dark:text-white mt-5">Bullet Point Features</h3>
      <ul class="list-disc pl-10 pt-5" v-for="(b, index) in bullet" :key="index">
        <li>{{ b }}</li>
      </ul>
      <h3 class="pl-5 text-xl font-extrabold dark:text-white mt-5">Rating count</h3>
      <div class="pl-5 pt-2 flex items-center">
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
      </div>
      <h3 class="pl-5 text-xl font-extrabold dark:text-white mt-5">Average rating</h3>
      <div class="pl-5 pt-2 flex items-center">
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
        <svg class="w-4 h-4 text-yellow-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>
      </div>
      <h3 class="pl-5 text-xl font-extrabold dark:text-white mt-5">Average buy box price for the last 30, 90 and 180 days</h3>
      <ul class="list-disc pl-10 pt-5" v-for="(price, index) in averagePrices" :key="index">
        <li>{{ price.day }} days: {{ price.avgPrice.toFixed(2) }}$</li>
      </ul>
      <h3 class="pl-5 text-xl font-extrabold dark:text-white mt-5">Amazon in-stock rate for the last 30, 90, 180 days</h3>
      <ul class="list-disc pl-10 pt-5" v-for="(stock, index) in stockRate" :key="index">
        <li>{{ stock.day }} days: {{ stock.stock.toFixed(2) }}%</li>
      </ul>
    </div>
  </div>

  <!-- Historical Sales Rank -->
  <div class="grid grid-cols-3 mt-10 p-10" v-if="categories.length">
    <div class="col-span-2 p-10">
        <Line id="line" ref="line" :data="chartData" :options="chartOptions"/>
      <!-- <RankChart :options="chartOptions" :chartData="chartDat" /> -->
    </div>
    <div class="col-span-1 pl-10">
      <h2 class="text-2xl font-extrabold dark:text-white">Categories</h2>
      <ul class="list-disc pl-10 pt-2" v-for="(ct, index) in categories" :key="index">
        <li>{{ ct.name }}</li>
      </ul>
    </div>
  </div>
</div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  } from 'chart.js';
  import { Line } from 'vue-chartjs';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  import getParameterByName from './utils/getParameterByName';
  import formattedDate from './utils/formattedDate';
  import getAVGBuyBoxPrice from './utils/getAVGBuyBoxPrice';
  import getStockRate from './utils/getStockRate';

  const error = ref(''); // Error message
  const isCache = ref(false);
  const code = ref(''); // Code of product
  const summary = ref('');
  const title = ref(''); // Title of Product
  const bullet = ref([]);
  const ratingCount = ref(0);
  const averageRating = ref(0);
  const averagePrices = ref([]);
  const stockRate = ref([]);
  const imagesCSV = ref(['./assets/logo.png']); // Images of product
  const categories = ref([]); // Categories
  const chartData = ref({
      labels: [],
      datasets: [{ 
        label: "Sales Rank",
        data: [] 
      }]
  });
  const line = ref(null);
  const chartOptions = ref({
    responsive: true,
    scales: {
      x: {
          display: false
      }
    }
  })

  onMounted(() => {
    code.value = getParameterByName('search');
    submitCode();
  })

  // Convert to img url
  function changeURL (url) {
    return `https://images-na.ssl-images-amazon.com/images/I/${url.substring(0, url.length - 4)}._UK_.jpg`;
  }

  async function submitCode() {
    if(!code.value.length) return;
    // Send the GET request to backend
    const response = await axios.get(process.env.VUE_APP_BACKEND_URL + 'products/' + (code.value ? code.value : '1'));
    const data = response.data;
    
    // If there's error, display the error message below the input
    if (!data.success) {
      error.value = data.msg;
      return ;
    }
    error.value = "";

    // If there's a data is in cache
    if(data.isCache && data.success) {
      isCache.value = true;
    }
    // Get product
    const { product } = data;
    
    // Set summary
    summary.value = data.summary;
    // Set product title
    title.value = product.title;
    // Set bullet point feature
    bullet.value = Array.from(product.features);
    // Set Rating Count
    const rating = product.csv[16];
    if(!rating) {
      ratingCount.value = 0;
      averageRating.value = 0;
    } else {
      ratingCount.value = 5;
      averageRating.value = 5;
    }

    // Set average price
    const days = [30, 90, 180];
    for(const day of days) {
      averagePrices.value.push({
        day,
        avgPrice: getAVGBuyBoxPrice(product, day) / 100
      });
    }
    // Set Amazon in-stock rate
    for(const day of days) {
      stockRate.value.push({
        day,
        stock: getStockRate(product, day)
      });
    }

    // Set product image
    const images = product.imagesCSV.split(',');
    
    imagesCSV.value = images.map(changeURL);
    // Set product category
    categories.value = product.categoryTree;

    // Seperate the sales_rank to label and dataset for chart
    const {sales_rank} = data;
    const label = [], dataset = [];
    // Even is time and odd is dataset
    sales_rank.map((value, index) => {
      if(index % 2) {
        dataset.push(value);
      } else {
        label.push(formattedDate(value));
      }
    });
    const newChartData = {...chartData, labels: label, backgroundColor: ['#C28535'] ,datasets: [{ 
      label: "Sales Rank",
      backgroundColor: '#f87979',
      data: dataset 
    }]};
    chartData.value = newChartData;
  }
</script>

<style>

</style>