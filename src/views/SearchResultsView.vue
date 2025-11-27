<script setup lang="ts">
import { ref } from 'vue'
import { MessageSquare, SlidersHorizontal } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import SearchFormInline from '@/components/search/SearchFormInline.vue'
import { usePromptGenerator } from '@/composables/usePromptGenerator'

const { sendPrompt } = usePromptGenerator()

const searchMode = ref<'assistant' | 'classic'>('assistant')
const chatMessage = ref<string>('')

const handleChatSubmit = (): void => {
  if (!chatMessage.value.trim()) return
  sendPrompt(chatMessage.value)
  chatMessage.value = ''
}
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
              />
              <Button type="submit">
                Search
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="classic" class="mt-0">
            <SearchFormInline />
          </TabsContent>
        </Tabs>
      </div>
    </header>

    <main class="w-full px-4 py-6">
      <div class="text-center text-muted-foreground">
        <p class="text-lg">Search results will appear here</p>
      </div>
    </main>
  </div>
</template>
