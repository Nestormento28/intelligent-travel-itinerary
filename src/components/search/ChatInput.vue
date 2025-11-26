<script setup>
import { computed } from 'vue'

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
  <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
    <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Travel Assistant</h1>
    <form @submit.prevent="handleSubmit" class="flex gap-2">
      <input
        v-model="message"
        type="text"
        placeholder="Ask me anything..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      />
      <button
        type="submit"
        class="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
      >
        Send
      </button>
    </form>
  </div>
</template>
