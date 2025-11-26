<script setup>
import { computed } from 'vue'
import { VueDatePicker } from '@vuepic/vue-datepicker'
import DateRangePicker from '../DateRangePicker.vue'

const props = defineProps({
  flightDateType: {
    type: String,
    default: 'single'
  },
  singleDate: {
    type: String,
    default: null
  },
  rangeValue: {
    type: Array,
    default: null
  },
  error: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'update:flightDateType',
  'update:singleDate',
  'update:rangeValue',
  'update:range'
])

const today = new Date()
today.setHours(0, 0, 0, 0)

const dateType = computed({
  get: () => props.flightDateType,
  set: (val) => emit('update:flightDateType', val)
})

const singleFlightDate = computed({
  get: () => props.singleDate,
  set: (val) => emit('update:singleDate', val)
})

const dateRangeValue = computed({
  get: () => props.rangeValue,
  set: (val) => emit('update:rangeValue', val)
})

const handleRangeUpdate = (range) => {
  emit('update:range', range)
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-gray-700 mb-2">
      Flight Date
    </label>
    <div class="flex gap-4 mb-3">
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          v-model="dateType"
          value="single"
          class="text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-700">One way</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input
          type="radio"
          v-model="dateType"
          value="range"
          class="text-blue-600 focus:ring-blue-500"
        />
        <span class="text-sm text-gray-700">Round trip</span>
      </label>
    </div>
    <div v-if="flightDateType === 'single'" :class="['single-date-wrapper', { 'has-error': error }]">
      <VueDatePicker
        v-model="singleFlightDate"
        :enable-time-picker="false"
        :min-date="today"
        auto-apply
        format="dd/MM/yyyy"
        model-type="dd/MM/yyyy"
        placeholder="Select date"
      />
    </div>
    <DateRangePicker
      v-else
      v-model="dateRangeValue"
      :error="!!error"
      @update:range="handleRangeUpdate"
    />
    <p v-if="error" class="text-red-500 text-xs mt-1">{{ error }}</p>
  </div>
</template>

<style>
.single-date-wrapper .dp__input {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;
}

.single-date-wrapper .dp__input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
}

.single-date-wrapper.has-error .dp__input {
  border-color: #ef4444;
}
</style>
