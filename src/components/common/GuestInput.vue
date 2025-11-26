<script setup>
import { computed } from 'vue'
import { GUESTS_CONFIG } from '../../constants/search.js'

const props = defineProps({
  modelValue: {
    type: Number,
    default: GUESTS_CONFIG.default
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const guests = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>

<template>
  <div>
    <label for="guests" class="block text-sm font-medium text-gray-700 mb-1">
      Guests
    </label>
    <input
      id="guests"
      v-model.number="guests"
      type="number"
      :min="GUESTS_CONFIG.min"
      :max="GUESTS_CONFIG.max"
      :class="[
        'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none',
        error ? 'border-red-500' : 'border-gray-300'
      ]"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>
