<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import ChatInput from '@/components/search/ChatInput.vue'
import SearchForm from '@/components/search/SearchForm.vue'
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
      <ChatInput
        v-model="chatMessage"
        @submit="handleChatSubmit"
      />

      <div class="flex items-center gap-4 my-6">
        <Separator class="flex-1" />
        <span class="text-muted-foreground font-medium">or</span>
        <Separator class="flex-1" />
      </div>

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
