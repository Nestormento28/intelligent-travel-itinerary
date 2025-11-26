<script setup lang="ts">
import { ref } from 'vue'

// Shadcn Components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// Components
import ChatInput from '@/components/search/ChatInput.vue'
import SearchForm from '@/components/search/SearchForm.vue'

// Composables
import { usePromptGenerator } from '@/composables/usePromptGenerator'

const { sendPrompt } = usePromptGenerator()
const chatMessage = ref<string>('')

const handleChatSubmit = (): void => {
  if (!chatMessage.value.trim()) return
  sendPrompt(chatMessage.value)
  chatMessage.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-background p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Travel Assistant Section -->
      <ChatInput
        v-model="chatMessage"
        @submit="handleChatSubmit"
      />

      <!-- Separator -->
      <div class="flex items-center gap-4 my-6">
        <Separator class="flex-1" />
        <span class="text-muted-foreground font-medium">or</span>
        <Separator class="flex-1" />
      </div>

      <!-- Classic Booking Section -->
      <Card>
        <CardHeader>
          <CardTitle class="text-center">Classic Booking</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchForm />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
