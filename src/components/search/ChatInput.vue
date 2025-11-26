<script setup>
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue', 'submit'])

const message = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="text-center">Travel Assistant</CardTitle>
    </CardHeader>
    <CardContent>
      <form @submit.prevent="handleSubmit" class="flex gap-2">
        <Input
          v-model="message"
          type="text"
          placeholder="Ask me anything..."
          class="flex-1"
        />
        <Button type="submit">
          Send
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
