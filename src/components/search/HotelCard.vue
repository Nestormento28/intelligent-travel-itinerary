<script setup lang="ts">
import { computed } from 'vue'
import { Star, MapPin, Bed, UtensilsCrossed, Wifi, AlertCircle } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { RoomResult } from '@/types'

interface Props {
  room: RoomResult
}

const props = defineProps<Props>()

const formattedPrice = computed(() => {
  const amount = parseFloat(props.room.price.total)
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: props.room.price.currency
  }).format(amount)
})

const starsArray = computed(() => Array.from({ length: props.room.hotel.stars }, (_, i) => i + 1))

const bedsDescription = computed(() => {
  return props.room.beds.map(bed => {
    const bedType = bed.type.toLowerCase().replace('_', ' ')
    return `${bed.count} ${bedType}`
  }).join(', ')
})

const includedServices = computed(() => {
  return props.room.services.filter(s => s.type === 'SERVICE_AVAILABILITY_TYPE_INCLUDED')
})

const hasWifi = computed(() => {
  return props.room.services.some(s => s.code === 'WIFI')
})

const isLowAvailability = computed(() => {
  return props.room.remainingUnits <= 5
})
</script>

<template>
  <Card
    class="overflow-hidden"
    :data-stars="room.hotel.stars"
    :data-city="room.hotel.location.city"
    :data-price="room.price.total"
    :data-meal-plan="room.mealPlan.code"
  >
    <CardContent class="flex items-stretch justify-between !py-4 !px-4">
      <!-- Left: Hotel & Room Info -->
      <div class="flex-1 space-y-2">
        <!-- Hotel Name & Stars -->
        <div class="flex items-center gap-2">
          <h3 class="font-semibold text-lg">{{ room.hotel.name }}</h3>
          <div class="flex items-center gap-0.5">
            <Star
              v-for="s in starsArray"
              :key="s"
              class="h-3 w-3 fill-yellow-400 text-yellow-400"
            />
          </div>
        </div>

        <!-- Location -->
        <div class="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin class="h-3 w-3" />
          {{ room.hotel.location.city }}, {{ room.hotel.location.country }}
        </div>

        <!-- Room Name -->
        <div class="font-medium text-sm">
          {{ room.roomName }}
        </div>

        <!-- Beds -->
        <div class="flex items-center gap-1 text-muted-foreground text-sm">
          <Bed class="h-3 w-3" />
          {{ bedsDescription }}
        </div>

        <!-- Meal Plan & Services -->
        <div class="flex items-center gap-3 text-sm">
          <div class="flex items-center gap-1 text-muted-foreground">
            <UtensilsCrossed class="h-3 w-3" />
            {{ room.mealPlan.description }}
          </div>
          <div v-if="hasWifi" class="flex items-center gap-1 text-muted-foreground">
            <Wifi class="h-3 w-3" />
            WiFi
          </div>
        </div>

        <!-- Low Availability Warning -->
        <div v-if="isLowAvailability" class="flex items-center gap-1 text-orange-600 text-xs font-medium">
          <AlertCircle class="h-3 w-3" />
          Only {{ room.remainingUnits }} rooms left!
        </div>
      </div>

      <!-- Right: Price Section -->
      <div class="flex flex-col items-end justify-between pl-4 border-l min-w-[140px]">
        <div>
          <div class="text-2xl font-bold">{{ formattedPrice }}</div>
          <div class="text-xs text-muted-foreground text-right">Total</div>
        </div>

        <div class="flex flex-col items-end gap-2">
          <Badge v-if="room.remainingUnits > 0" variant="secondary" class="text-xs">
            {{ room.remainingUnits }} available
          </Badge>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
