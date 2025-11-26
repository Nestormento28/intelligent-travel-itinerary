<script setup>
import {ref, watch} from 'vue'

// shadcn-vue Components
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {Tabs, TabsList, TabsTrigger} from '@/components/ui/tabs'
import {Label} from '@/components/ui/label'
import {Separator} from '@/components/ui/separator'

// Components
import BudgetSlider from '@/components/common/BudgetSlider.vue'
import GuestInput from '@/components/common/GuestInput.vue'
import LocationInput from '@/components/common/LocationInput.vue'
import ExtraInfoInput from '@/components/common/ExtraInfoInput.vue'
import ChatInput from '@/components/search/ChatInput.vue'
import FlightDatePicker from '@/components/search/FlightDatePicker.vue'
import DateRangePicker from '@/components/DateRangePicker.vue'

// Composables
import {useSearchValidation} from '@/composables/useSearchValidation.js'
import {usePromptGenerator} from '@/composables/usePromptGenerator.js'

// Constants
import {BUDGET_CONFIG, GUESTS_CONFIG, SEARCH_TABS} from '@/constants/search.js'

// Initialize composables
const {errors, clearErrors, clearError, validateForm} = useSearchValidation()
const {generatePrompt, sendPrompt} = usePromptGenerator()

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

// Clear errors when tab changes
watch(activeTab, () => {
  clearErrors()
})

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
  <div class="min-h-screen bg-background p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Travel Assistant Section -->
      <ChatInput
          v-model="chatMessage"
          @submit="handleChatSubmit"
      />

      <!-- Or Separator -->
      <div class="flex items-center gap-4 my-6">
        <Separator class="flex-1" />
        <span class="text-muted-foreground font-medium">or</span>
        <Separator class="flex-1" />
      </div>

      <!-- Classic Booking Section -->
      <Card>
        <CardHeader>
          <CardTitle class="text-center">Classic Booking</CardTitle>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </div>
  </div>
</template>
