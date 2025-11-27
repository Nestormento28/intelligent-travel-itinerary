<script setup lang="ts">
import { computed } from 'vue'
import { Star, MapPin } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { RoomPrice, HotelInfo } from '@/types'

interface Props {
  roomName: string
  price: RoomPrice
  hotel: HotelInfo
}

const props = defineProps<Props>()

const formattedPrice = computed(() => {
  const amount = parseFloat(props.price.total)
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: props.price.currency
  }).format(amount)
})

const starsArray = computed(() => Array.from({ length: props.hotel.stars }, (_, i) => i + 1))
</script>

<template>
  <Card
    class="overflow-hidden"
    :data-stars="hotel.stars"
    :data-city="hotel.location.city"
    :data-price="price.total"
  >
    <CardContent class="flex items-center justify-between !py-4 !px-4">
      <div class="flex-1">
        <h3 class="font-semibold text-lg">{{ hotel.name }}</h3>

        <div class="flex items-center gap-1 text-muted-foreground text-sm mt-1">
          <MapPin class="h-3 w-3" />
          {{ hotel.location.city }}
        </div>

        <div class="flex items-center gap-1 mt-2">
          <Star
            v-for="s in starsArray"
            :key="s"
            class="h-3 w-3 fill-yellow-400 text-yellow-400"
          />
        </div>

        <div class="mt-2 text-sm text-muted-foreground">
          {{ roomName }}
        </div>
      </div>

      <div class="flex flex-col items-end justify-center pl-4 border-l">
        <div class="text-2xl font-bold">{{ formattedPrice }}</div>
        <div class="text-xs text-muted-foreground">Total</div>
        <Button size="sm" class="mt-3">View Details</Button>
      </div>
    </CardContent>
  </Card>
</template>
