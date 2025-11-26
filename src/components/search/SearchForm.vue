<script setup lang="ts">
import { watch } from 'vue'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'

// Components
import BudgetSlider from '@/components/common/BudgetSlider.vue'
import GuestInput from '@/components/common/GuestInput.vue'
import LocationInput from '@/components/common/LocationInput.vue'
import ExtraInfoInput from '@/components/common/ExtraInfoInput.vue'
import FlightDatePicker from '@/components/search/FlightDatePicker.vue'
import DateRangePicker from '@/components/DateRangePicker.vue'

// Composables
import { useBookingForm } from '@/composables/useBookingForm'
import { useSearchValidation, type DateRangeData } from '@/composables/useSearchValidation'
import { usePromptGenerator } from '@/composables/usePromptGenerator'

// Constants
import { SEARCH_TABS } from '@/constants/search'

// Form state and logic
const {
  activeTab,
  origin,
  destination,
  dateRangeValue,
  dateRangeData,
  flightDateType,
  singleFlightDate,
  budget,
  guests,
  extraInfo,
  getFormData
} = useBookingForm()

const { errors, clearErrors, clearError, validateForm } = useSearchValidation()
const { generatePrompt, sendPrompt } = usePromptGenerator()

// Handlers
const handleRangeUpdate = (range: DateRangeData): void => {
  dateRangeData.value = range
}

const handleSubmit = (): void => {
  const formData = getFormData()
  if (!validateForm(formData)) {
    return
  }
  const prompt = generatePrompt(formData)
  sendPrompt(prompt)
}

const getSubmitButtonText = (): string => {
  if (activeTab.value === 'hotel') return 'Search Hotels'
  if (activeTab.value === 'flights') return 'Search Flights'
  return 'Search Hotels + Flights'
}

// Watchers
watch(activeTab, () => {
  clearErrors()
})

watch(flightDateType, () => {
  clearError('dates')
})
</script>

<template>
  <Tabs v-model="activeTab" class="w-full">
    <!-- Tabs Navigation -->
    <TabsList class="grid w-full grid-cols-3 mb-6">
      <TabsTrigger
        v-for="tab in SEARCH_TABS"
        :key="tab.id"
        :value="tab.id"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <!-- Form Content -->
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <!-- Origin & Destination Row -->
      <div :class="activeTab !== 'hotel' ? 'grid grid-cols-2 gap-4' : ''">
        <!-- Origin - hidden for Hotel tab -->
        <LocationInput
          v-if="activeTab !== 'hotel'"
          id="origin"
          v-model="origin"
          :error="errors.origin"
          label="Origin"
          placeholder="Where are you from?"
        />

        <LocationInput
          id="destination"
          v-model="destination"
          :error="errors.destination"
          label="Destination"
          placeholder="Where are you going?"
        />
      </div>

      <!-- Dates for Hotel and Hotel+Flights -->
      <div v-if="activeTab !== 'flights'" class="space-y-2">
        <Label>Dates</Label>
        <DateRangePicker
          v-model="dateRangeValue"
          :error="!!errors.dates"
          @update:range="handleRangeUpdate"
        />
        <p v-if="errors.dates" class="text-sm text-destructive">{{ errors.dates }}</p>
      </div>

      <!-- Dates for Flights - with single/range toggle -->
      <FlightDatePicker
        v-if="activeTab === 'flights'"
        v-model:flightDateType="flightDateType"
        v-model:rangeValue="dateRangeValue"
        v-model:singleDate="singleFlightDate"
        :error="errors.dates"
        @update:range="handleRangeUpdate"
      />

      <!-- Budget & Guests Row -->
      <div class="grid grid-cols-2 gap-4">
        <BudgetSlider
          v-model="budget"
          :error="errors.budget"
        />

        <GuestInput
          v-model="guests"
          :error="errors.guests"
        />
      </div>

      <ExtraInfoInput
        v-model="extraInfo"
        :error="errors.extraInfo"
      />

      <Button class="w-full" type="submit">
        {{ getSubmitButtonText() }}
      </Button>
    </form>
  </Tabs>
</template>

