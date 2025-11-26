  <script setup>
  import { computed, watch } from 'vue'
  import { VueDatePicker } from '@vuepic/vue-datepicker'
  import '@vuepic/vue-datepicker/dist/main.css'

  const props = defineProps({
    modelValue: {
      type: Array,
      default: null
    },
    error: {
      type: Boolean,
      default: false
    }
  })

  const emit = defineEmits(['update:modelValue', 'update:range'])

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dateRange = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })

  const parseDateString = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0])
    }
    return new Date(dateStr)
  }

  const numberOfNights = computed(() => {
    if (!dateRange.value || !dateRange.value[0] || !dateRange.value[1]) {
      return 0
    }
    const start = parseDateString(dateRange.value[0])
    const end = parseDateString(dateRange.value[1])
    if (!start || !end) return 0
    const diffTime = Math.abs(end - start)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  })

  watch(dateRange, (newValue) => {
    emit('update:range', {
      startDate: newValue?.[0] || null,
      endDate: newValue?.[1] || null,
      nights: numberOfNights.value
    })
  })
  </script>

  <template setup>
    <div :class="['date-picker-wrapper', { 'has-error': error }]">
      <VueDatePicker
        v-model="dateRange"
        range
        auto-apply
        format="dd/MM/yyyy"
        preview-format="dd/MM/yyyy"
        model-type="dd/MM/yyyy"
        placeholder="Check-in — Check-out"
        :enable-time-picker="false"
        :min-date="today"
        :min-range="2"
      />
    </div>
  </template>

  <style scoped>
  .date-picker-wrapper :deep(.dp__input) {
    width: 100%;
    padding: 0.5rem 1rem 0.5rem 2.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    outline: none;
  }

  .date-picker-wrapper :deep(.dp__input:focus) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.3);
  }

  .date-picker-wrapper.has-error :deep(.dp__input) {
    border-color: #ef4444;
  }
  </style>
