<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { MessageSquare, SlidersHorizontal, Loader2 } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import SearchFormInline from '@/components/search/SearchFormInline.vue'
import SearchFilters from '@/components/search/SearchFilters.vue'
import SearchResults from '@/components/search/SearchResults.vue'
import { useSearchStore } from '@/composables/useSearchStore'
import type { RoomResult, HotelSearchResponse } from '@/types'
import hotelMockData from '@/mocks/hotelResponse.json'

const { searchMode, chatMessage, activeTab, generatedPrompt, setSearchData } = useSearchStore()

const hasSearched = ref(false)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)
const hotelResults = ref<RoomResult[]>([])
const sortBy = ref<string>('default')

const fetchHotelResults = async (): Promise<HotelSearchResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  // In production, this would be a real API call:
  // const response = await fetch('/api/hotels/search', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ prompt })
  // })
  // if (!response.ok) throw new Error('Failed to fetch hotel results')
  // return response.json()

  return hotelMockData as HotelSearchResponse
}

const sendPrompt = async (prompt: string): Promise<void> => {
  console.log('Sending prompt:', prompt)

  isLoading.value = true
  errorMessage.value = null
  hasSearched.value = true
  hotelResults.value = []

  try {
    const response = await fetchHotelResults()
    hotelResults.value = response.rooms
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An unexpected error occurred'
    errorMessage.value = `Failed to load search results: ${message}`
    console.error('Search error:', error)
  } finally {
    isLoading.value = false
  }
}

const handleChatSubmit = (): void => {
  if (!chatMessage.value.trim()) return
  setSearchData({ generatedPrompt: chatMessage.value })
  sendPrompt(chatMessage.value)
}

const handleClassicSearch = (prompt: string): void => {
  sendPrompt(prompt)
}

onMounted(() => {
  if (generatedPrompt.value) {
    sendPrompt(generatedPrompt.value)
  }
})
</script>

<template>
  <div class="min-h-screen bg-background">
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="w-full px-4 py-3">
        <Tabs v-model="searchMode" class="w-full">
          <div class="flex items-center gap-4">
            <TabsList>
              <TabsTrigger value="assistant" class="gap-2">
                <MessageSquare class="h-4 w-4" />
                Assistant
              </TabsTrigger>
              <TabsTrigger value="classic" class="gap-2">
                <SlidersHorizontal class="h-4 w-4" />
                Classic
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="assistant" class="mt-0">
            <form @submit.prevent="handleChatSubmit" class="flex gap-2 max-w-2xl">
              <Input
                v-model="chatMessage"
                type="text"
                placeholder="Ask me anything about your travel..."
                class="flex-1"
                :disabled="isLoading"
              />
              <Button type="submit" :disabled="isLoading">
                <Loader2 v-if="isLoading" class="h-4 w-4 animate-spin mr-2" />
                Search
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="classic" class="mt-0">
            <SearchFormInline @search="handleClassicSearch" :disabled="isLoading" />
          </TabsContent>
        </Tabs>
      </div>
    </header>

    <main class="w-full px-4 py-6">
      <div class="flex gap-6">
        <SearchFilters :search-type="activeTab" v-model:sort-by="sortBy" class="border-r pr-6" />

        <div class="flex-1">
          <!-- Loading State -->
          <div v-if="isLoading" class="flex flex-col items-center justify-center py-12">
            <Loader2 class="h-8 w-8 animate-spin text-primary mb-4" />
            <p class="text-muted-foreground">Searching for the best options...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="errorMessage" class="text-center py-12">
            <div class="bg-destructive/10 text-destructive rounded-lg p-6 max-w-md mx-auto">
              <p class="font-medium">Something went wrong</p>
              <p class="text-sm mt-2">{{ errorMessage }}</p>
              <Button
                variant="outline"
                size="sm"
                class="mt-4"
                @click="generatedPrompt ? sendPrompt(generatedPrompt) : null"
              >
                Try Again
              </Button>
            </div>
          </div>

          <!-- Results -->
          <SearchResults
            v-else-if="hasSearched"
            :search-type="activeTab"
            :hotels="hotelResults"
            :sort-by="sortBy"
          />

          <!-- Initial State -->
          <div v-else class="text-center text-muted-foreground py-12">
            <p class="text-lg">Search results will appear here</p>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
