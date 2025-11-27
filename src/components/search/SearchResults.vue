<script setup lang="ts">
import { ref } from 'vue'
import HotelCard from './HotelCard.vue'
import FlightCard from './FlightCard.vue'
import PackageCard from './PackageCard.vue'

interface Props {
  searchType: 'hotel' | 'flights' | 'hotel+flights'
}

defineProps<Props>()

const demoHotels = ref([
  {
    id: 1,
    name: 'Grand Plaza Hotel',
    location: 'Downtown, City Center',
    stars: 5,
    price: 450,
    pricePerNight: 150,
    nights: 3,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
    amenities: ['wifi', 'parking', 'breakfast'],
    rating: 9.2
  },
  {
    id: 2,
    name: 'Comfort Inn & Suites',
    location: 'Near Airport',
    stars: 3,
    price: 270,
    pricePerNight: 90,
    nights: 3,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
    amenities: ['wifi', 'parking'],
    rating: 7.8
  }
])

const demoFlights = ref([
  {
    id: 1,
    airline: 'Sky Airways',
    airlineLogo: '',
    departureTime: '08:30',
    arrivalTime: '11:45',
    departureAirport: 'MAD',
    arrivalAirport: 'BCN',
    duration: '3h 15m',
    stops: 0,
    price: 89,
    cabinClass: 'Economy'
  },
  {
    id: 2,
    airline: 'Euro Wings',
    airlineLogo: '',
    departureTime: '14:00',
    arrivalTime: '18:30',
    departureAirport: 'MAD',
    arrivalAirport: 'BCN',
    duration: '4h 30m',
    stops: 1,
    price: 65,
    cabinClass: 'Economy'
  }
])

const demoPackages = ref([
  {
    id: 1,
    flight: {
      airline: 'Sky Airways',
      departureTime: '08:30',
      arrivalTime: '11:45',
      departureAirport: 'MAD',
      arrivalAirport: 'BCN',
      duration: '3h 15m',
      stops: 0,
      price: 89
    },
    hotel: {
      name: 'Grand Plaza Hotel',
      location: 'Downtown, City Center',
      stars: 5,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop',
      amenities: ['wifi', 'parking', 'breakfast'],
      rating: 9.2,
      price: 450
    },
    nights: 3
  },
  {
    id: 2,
    flight: {
      airline: 'Euro Wings',
      departureTime: '14:00',
      arrivalTime: '18:30',
      departureAirport: 'MAD',
      arrivalAirport: 'BCN',
      duration: '4h 30m',
      stops: 1,
      price: 65
    },
    hotel: {
      name: 'Comfort Inn & Suites',
      location: 'Near Airport',
      stars: 3,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop',
      amenities: ['wifi', 'parking'],
      rating: 7.8,
      price: 270
    },
    nights: 3
  }
])
</script>

<template>
  <div class="space-y-6">
    <!-- Hotel + Flights: Show Package Cards -->
    <template v-if="searchType === 'hotel+flights'">
      <div>
        <h2 class="text-lg font-semibold mb-4">Available Packages</h2>
        <div class="space-y-3">
          <PackageCard
            v-for="pkg in demoPackages"
            :key="pkg.id"
            :flight="pkg.flight"
            :hotel="pkg.hotel"
            :total-price="pkg.flight.price + pkg.hotel.price"
            :nights="pkg.nights"
          />
        </div>
      </div>
    </template>

    <!-- Flights Only -->
    <template v-else-if="searchType === 'flights'">
      <div>
        <h2 class="text-lg font-semibold mb-4">Available Flights</h2>
        <div class="space-y-3">
          <FlightCard
            v-for="flight in demoFlights"
            :key="flight.id"
            v-bind="flight"
          />
        </div>
      </div>
    </template>

    <!-- Hotels Only -->
    <template v-else>
      <div>
        <h2 class="text-lg font-semibold mb-4">Available Hotels</h2>
        <div class="space-y-3">
          <HotelCard
            v-for="hotel in demoHotels"
            :key="hotel.id"
            v-bind="hotel"
          />
        </div>
      </div>
    </template>
  </div>
</template>
