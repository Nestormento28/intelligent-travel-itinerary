<script setup lang="ts">
import { Star, Wifi, Car, UtensilsCrossed, MapPin, Plane, Clock } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

interface FlightInfo {
  airline: string
  departureTime: string
  arrivalTime: string
  departureAirport: string
  arrivalAirport: string
  duration: string
  stops: number
}

interface HotelInfo {
  name: string
  location: string
  stars: number
  image: string
  amenities: string[]
  rating: number
}

interface Props {
  flight: FlightInfo
  hotel: HotelInfo
  totalPrice: number
  nights: number
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden">
    <div class="flex">
      <!-- Hotel Image -->
      <div class="w-48 shrink-0 bg-muted">
        <img :src="hotel.image" :alt="hotel.name" class="w-full h-full object-cover" />
      </div>

      <!-- Flight + Hotel Info -->
      <CardContent class="flex-1 !py-4 !px-4">
        <!-- Flight Section -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0">
            <Plane class="h-5 w-5 text-muted-foreground" />
          </div>
          <div class="flex items-center gap-6 flex-1">
            <div class="text-center">
              <div class="font-bold">{{ flight.departureTime }}</div>
              <div class="text-xs text-muted-foreground">{{ flight.departureAirport }}</div>
            </div>
            <div class="flex flex-col items-center gap-0.5 flex-1">
              <div class="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock class="h-3 w-3" />
                {{ flight.duration }}
              </div>
              <div class="w-full h-px bg-border relative">
                <Plane class="h-3 w-3 absolute -top-1.5 left-1/2 -translate-x-1/2 text-muted-foreground" />
              </div>
              <div class="text-xs text-muted-foreground">
                {{ flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}` }}
              </div>
            </div>
            <div class="text-center">
              <div class="font-bold">{{ flight.arrivalTime }}</div>
              <div class="text-xs text-muted-foreground">{{ flight.arrivalAirport }}</div>
            </div>
          </div>
          <div class="text-sm text-muted-foreground">{{ flight.airline }}</div>
        </div>

        <Separator class="my-3" />

        <!-- Hotel Section -->
        <div class="flex items-center gap-4">
          <div class="w-10 h-10 rounded bg-muted flex items-center justify-center shrink-0">
            <MapPin class="h-5 w-5 text-muted-foreground" />
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold">{{ hotel.name }}</h3>
              <div class="flex items-center gap-0.5">
                <Star
                  v-for="s in hotel.stars"
                  :key="s"
                  class="h-3 w-3 fill-yellow-400 text-yellow-400"
                />
              </div>
            </div>
            <div class="flex items-center gap-1 text-muted-foreground text-sm">
              {{ hotel.location }}
            </div>
            <div class="flex items-center gap-3 mt-1 text-muted-foreground">
              <Wifi v-if="hotel.amenities.includes('wifi')" class="h-3 w-3" />
              <Car v-if="hotel.amenities.includes('parking')" class="h-3 w-3" />
              <UtensilsCrossed v-if="hotel.amenities.includes('breakfast')" class="h-3 w-3" />
            </div>
          </div>
          <Badge variant="secondary">{{ hotel.rating }}/10</Badge>
        </div>
      </CardContent>

      <!-- Price Section -->
      <div class="flex flex-col items-end justify-center px-4 py-4 border-l min-w-[140px]">
        <Badge variant="outline" class="mb-2">Package Deal</Badge>
        <div class="text-2xl font-bold">{{ totalPrice }}€</div>
        <div class="text-xs text-muted-foreground">Total · {{ nights }} nights</div>
        <Button size="sm" class="mt-3">View Package</Button>
      </div>
    </div>
  </Card>
</template>
