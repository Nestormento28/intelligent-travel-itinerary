<script setup lang="ts">
import { ref, computed } from 'vue'
import HotelCard from './HotelCard.vue'
import FlightCard from './FlightCard.vue'
import PackageCard from './PackageCard.vue'
import type { RoomResult } from '@/types'

interface Props {
  searchType: 'hotel' | 'flights' | 'hotel+flights'
  hotels?: RoomResult[]
  sortBy?: string
  starFilters?: Record<number, boolean>
}

const props = defineProps<Props>()

// Check if any star filter is active
const hasActiveStarFilter = computed(() => {
  if (!props.starFilters) return false
  return Object.values(props.starFilters).some(v => v)
})

// Filtered and sorted hotels
const sortedHotels = computed(() => {
  if (!props.hotels) return []

  let filtered = [...props.hotels]

  // Apply star filter if any star is selected
  if (hasActiveStarFilter.value && props.starFilters) {
    filtered = filtered.filter(room => {
      const stars = room.hotel.stars
      return props.starFilters![stars]
    })
  }

  // Apply sorting
  switch (props.sortBy) {
    case 'price-asc':
      return filtered.sort((a, b) => parseFloat(a.price.total) - parseFloat(b.price.total))
    case 'price-desc':
      return filtered.sort((a, b) => parseFloat(b.price.total) - parseFloat(a.price.total))
    default:
      return filtered
  }
})

// Sorted flights based on sortBy prop
const sortedFlights = computed(() => {
  const flightsCopy = [...demoFlights.value]

  switch (props.sortBy) {
    case 'price-asc':
      return flightsCopy.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return flightsCopy.sort((a, b) => b.price - a.price)
    default:
      return flightsCopy
  }
})

// Demo data for flights (kept for now - flight API structure not yet available)
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

// Demo flight data for packages (flight API structure not yet available)
const demoFlightForPackage = {
  airline: 'Sky Airways',
  departureTime: '08:30',
  arrivalTime: '11:45',
  departureAirport: 'MAD',
  arrivalAirport: 'BCN',
  duration: '3h 15m',
  stops: 0,
  price: 89
}

// Compute total price (hotel + demo flight)
const calculateTotalPrice = (hotelPrice: string, flightPrice: number): string => {
  const hotelAmount = parseFloat(hotelPrice)
  const total = hotelAmount + flightPrice
  return total.toFixed(2)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Hotel + Flights: Show Package Cards -->
    <template v-if="searchType === 'hotel+flights'">
      <div>
        <h2 class="text-lg font-semibold mb-4">Available Packages</h2>
        <div v-if="sortedHotels.length > 0" class="space-y-3">
          <PackageCard
            v-for="(room, index) in sortedHotels"
            :key="`${room.hotel.name}-${room.roomName}-${index}`"
            :flight="demoFlightForPackage"
            :hotel="room.hotel"
            :room-name="room.roomName"
            :room-price="room.price"
            :total-price="calculateTotalPrice(room.price.total, demoFlightForPackage.price)"
          />
        </div>
        <div v-else class="text-center text-muted-foreground py-8">
          <p>No packages found matching your criteria.</p>
        </div>
      </div>
    </template>

    <!-- Flights Only -->
    <template v-else-if="searchType === 'flights'">
      <div>
        <h2 class="text-lg font-semibold mb-4">Available Flights</h2>
        <div class="space-y-3">
          <FlightCard
            v-for="flight in sortedFlights"
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
        <div v-if="sortedHotels.length > 0" class="space-y-3">
          <HotelCard
            v-for="(room, index) in sortedHotels"
            :key="`${room.hotel.code}-${room.roomCode}-${index}`"
            :room="room"
          />
        </div>
        <div v-else class="text-center text-muted-foreground py-8">
          <p>No hotels found matching your criteria.</p>
        </div>
      </div>
    </template>
  </div>
</template>
