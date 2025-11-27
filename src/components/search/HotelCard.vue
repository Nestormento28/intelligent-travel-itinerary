<script setup lang="ts">
import { Star, Wifi, Car, UtensilsCrossed, MapPin } from 'lucide-vue-next'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Props {
  name: string
  location: string
  stars: number
  price: number
  pricePerNight: number
  nights: number
  image: string
  amenities: string[]
  rating: number
}

defineProps<Props>()
</script>

<template>
  <Card class="overflow-hidden">
    <div class="flex">
      <div class="w-48 shrink-0 bg-muted">
        <img :src="image" :alt="name" class="w-full h-full object-cover" />
      </div>

      <CardContent class="flex-1 flex items-center !py-4 !px-4">
        <div>
          <h3 class="font-semibold text-lg">{{ name }}</h3>
          <div class="flex items-center gap-1 text-muted-foreground text-sm mt-1">
            <MapPin class="h-3 w-3" />
            {{ location }}
          </div>
          <div class="flex items-center gap-1 mt-2">
            <Star
              v-for="s in stars"
              :key="s"
              class="h-3 w-3 fill-yellow-400 text-yellow-400"
            />
          </div>
          <div class="flex items-center gap-3 mt-3 text-muted-foreground">
            <Wifi v-if="amenities.includes('wifi')" class="h-4 w-4" />
            <Car v-if="amenities.includes('parking')" class="h-4 w-4" />
            <UtensilsCrossed v-if="amenities.includes('breakfast')" class="h-4 w-4" />
          </div>
        </div>
      </CardContent>

      <div class="flex flex-col items-end justify-center px-4 py-4 border-l">
        <div class="text-2xl font-bold">{{ price }}€</div>
        <div class="text-xs text-muted-foreground">{{ pricePerNight }}€/night · {{ nights }} nights</div>
        <Badge variant="secondary" class="mt-1">{{ rating }}/10</Badge>
        <Button size="sm" class="mt-3">View Details</Button>
      </div>
    </div>
  </Card>
</template>
