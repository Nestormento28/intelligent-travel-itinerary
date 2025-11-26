<script setup>
import { computed } from 'vue'
import Slider from '@vueform/slider'
import '@vueform/slider/themes/default.css'
import { BUDGET_CONFIG } from '../../constants/search.js'

const props = defineProps({
  modelValue: {
    type: Number,
    default: BUDGET_CONFIG.default
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const budget = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const formattedBudget = computed(() => {
  return props.modelValue.toLocaleString()
})
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-4">
      Budget: {{ formattedBudget }}
    </label>
    <Slider
      v-model="budget"
      :min="BUDGET_CONFIG.min"
      :max="BUDGET_CONFIG.max"
      :step="BUDGET_CONFIG.step"
      :lazy="false"
      show-tooltip="drag"
      class="slider-blue"
    />
    <div class="flex justify-between text-xs text-gray-500 mt-1">
      <span>{{ BUDGET_CONFIG.min }}</span>
      <span>{{ BUDGET_CONFIG.max.toLocaleString() }}</span>
    </div>
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<style>
.slider-blue {
  --slider-connect-bg: #2563eb;
  --slider-tooltip-bg: #2563eb;
  --slider-handle-ring-color: #2563eb30;
}
</style>
