<script setup>
import { ref, watch } from 'vue'

// Components
import TabGroup from './components/common/TabGroup.vue'
import BudgetSlider from './components/common/BudgetSlider.vue'
import GuestInput from './components/common/GuestInput.vue'
import LocationInput from './components/common/LocationInput.vue'
import ExtraInfoInput from './components/common/ExtraInfoInput.vue'
import ChatInput from './components/search/ChatInput.vue'
import FlightDatePicker from './components/search/FlightDatePicker.vue'
import DateRangePicker from './components/DateRangePicker.vue'

// Composables
import { useSearchValidation } from './composables/useSearchValidation.js'
import { usePromptGenerator } from './composables/usePromptGenerator.js'

// Constants
import { SEARCH_TABS, BUDGET_CONFIG, GUESTS_CONFIG } from './constants/search.js'

// Initialize composables
const { errors, clearErrors, clearError, validateForm } = useSearchValidation()
const { generatePrompt, sendPrompt } = usePromptGenerator()

// Form state
const activeTab = ref('hotel')
const origin = ref('')
const destination = ref('')
const dateRangeValue = ref(null)
const dateRangeData = ref({
  startDate: null,
  endDate: null,
  nights: 0
})
const flightDateType = ref('single')
const singleFlightDate = ref(null)
const budget = ref(BUDGET_CONFIG.default)
const guests = ref(GUESTS_CONFIG.default)
const extraInfo = ref('')
const chatMessage = ref('')

// Handlers
const handleTabChange = (tabId) => {
  activeTab.value = tabId
  clearErrors()
}

const handleRangeUpdate = (range) => {
  dateRangeData.value = range
}

const getFormData = () => ({
  activeTab: activeTab.value,
  origin: origin.value,
  destination: destination.value,
  flightDateType: flightDateType.value,
  singleFlightDate: singleFlightDate.value,
  dateRangeData: dateRangeData.value,
  budget: budget.value,
  guests: guests.value,
  extraInfo: extraInfo.value
})

const handleSubmit = () => {
  const formData = getFormData()
  if (!validateForm(formData)) {
    return
  }
  const prompt = generatePrompt(formData)
  sendPrompt(prompt)
}

const handleChatSubmit = () => {
  if (!chatMessage.value.trim()) return
  sendPrompt(chatMessage.value)
  chatMessage.value = ''
}

// Clear dates error when switching between one way and round trip
watch(flightDateType, () => {
  clearError('dates')
})

// Computed button text
const getSubmitButtonText = () => {
  if (activeTab.value === 'hotel') return 'Search Hotels'
  if (activeTab.value === 'flights') return 'Search Flights'
  return 'Search Hotels + Flights'
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Travel Assistant Section -->
      <ChatInput
        v-model="chatMessage"
        @submit="handleChatSubmit"
      />

      <!-- Or Separator -->
      <div class="flex items-center gap-4 my-6">
        <div class="flex-1 h-px bg-gray-300"></div>
        <span class="text-gray-500 font-medium">or</span>
        <div class="flex-1 h-px bg-gray-300"></div>
      </div>

      <!-- Classic Booking Section -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Classic Booking</h1>

        <!-- Tabs -->
        <TabGroup
          v-model="activeTab"
          :tabs="SEARCH_TABS"
          @update:modelValue="handleTabChange"
        />

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Origin & Destination Row -->
          <div :class="activeTab !== 'hotel' ? 'grid grid-cols-2 gap-4' : ''">
            <!-- Origin - hidden for Hotel tab -->
            <LocationInput
              v-if="activeTab !== 'hotel'"
              id="origin"
              v-model="origin"
              label="Origin"
              placeholder="Where are you from?"
              :error="errors.origin"
            />

            <LocationInput
              id="destination"
              v-model="destination"
              label="Destination"
              placeholder="Where are you going?"
              :error="errors.destination"
            />
          </div>

          <!-- Dates for Hotel and Hotel+Flights -->
          <div v-if="activeTab !== 'flights'">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Dates
            </label>
            <DateRangePicker
              v-model="dateRangeValue"
              :error="!!errors.dates"
              @update:range="handleRangeUpdate"
            />
            <p v-if="errors.dates" class="text-red-500 text-xs mt-1">{{ errors.dates }}</p>
          </div>

          <!-- Dates for Flights - with single/range toggle -->
          <FlightDatePicker
            v-if="activeTab === 'flights'"
            v-model:flightDateType="flightDateType"
            v-model:singleDate="singleFlightDate"
            v-model:rangeValue="dateRangeValue"
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

          <button
            type="submit"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            {{ getSubmitButtonText() }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
