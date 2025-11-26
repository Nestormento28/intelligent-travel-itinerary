<script setup>
import { computed } from 'vue'
import { VALIDATION_RULES } from '../../constants/search.js'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const extraInfo = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const maxChars = VALIDATION_RULES.maxExtraInfoChars
</script>

<template>
  <div>
    <label for="extraInfo" class="block text-sm font-medium text-gray-700 mb-1">
      Extra Info <span class="text-gray-400 font-normal">(optional)</span>
    </label>
    <textarea
      id="extraInfo"
      v-model="extraInfo"
      :maxlength="maxChars"
      rows="2"
      placeholder="Hotel with spa, first class flight, near to the beach..."
      :class="[
        'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none',
        error ? 'border-red-500' : 'border-gray-300'
      ]"
    ></textarea>
    <div class="flex justify-between text-xs mt-1">
      <p v-if="error" class="text-red-500">{{ error }}</p>
      <span :class="modelValue.length > maxChars ? 'text-red-500' : 'text-gray-400'" class="ml-auto">
        {{ modelValue.length }}/{{ maxChars }}
      </span>
    </div>
  </div>
</template>
