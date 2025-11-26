import { reactive } from 'vue'
import {
  BUDGET_CONFIG,
  GUESTS_CONFIG,
  VALIDATION_RULES,
  ERROR_MESSAGES
} from '../constants/search.js'

/**
 * Composable for search form validation
 * @returns {Object} Validation state and methods
 */
export function useSearchValidation() {
  const errors = reactive({
    origin: '',
    destination: '',
    dates: '',
    budget: '',
    guests: '',
    extraInfo: ''
  })

  /**
   * Clear all validation errors
   */
  const clearErrors = () => {
    errors.origin = ''
    errors.destination = ''
    errors.dates = ''
    errors.budget = ''
    errors.guests = ''
    errors.extraInfo = ''
  }

  /**
   * Clear a specific error field
   * @param {string} field - The field name to clear
   */
  const clearError = (field) => {
    if (field in errors) {
      errors[field] = ''
    }
  }

  /**
   * Parse a date string in dd/MM/yyyy format
   * @param {string} dateStr - Date string to parse
   * @returns {Date|null} Parsed date or null
   */
  const parseDateString = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(parts[2], parts[1] - 1, parts[0])
    }
    return new Date(dateStr)
  }

  /**
   * Validate the search form
   * @param {Object} formData - Form data to validate
   * @param {string} formData.activeTab - Current active tab
   * @param {string} formData.origin - Origin location
   * @param {string} formData.destination - Destination location
   * @param {string} formData.flightDateType - Flight date type (single/range)
   * @param {string} formData.singleFlightDate - Single flight date
   * @param {Object} formData.dateRangeData - Date range data
   * @param {number} formData.budget - Budget value
   * @param {number} formData.guests - Number of guests
   * @param {string} formData.extraInfo - Extra information
   * @returns {boolean} True if form is valid
   */
  const validateForm = (formData) => {
    clearErrors()
    let isValid = true
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const {
      activeTab,
      origin,
      destination,
      flightDateType,
      singleFlightDate,
      dateRangeData,
      budget,
      guests,
      extraInfo
    } = formData

    // Origin validation (only for flights and hotel+flights)
    if (activeTab !== 'hotel') {
      if (!origin.trim()) {
        errors.origin = ERROR_MESSAGES.origin.required
        isValid = false
      } else if (origin.trim().length < VALIDATION_RULES.minLocationChars) {
        errors.origin = ERROR_MESSAGES.origin.minLength
        isValid = false
      }
    }

    // Destination validation
    if (!destination.trim()) {
      errors.destination = ERROR_MESSAGES.destination.required
      isValid = false
    } else if (destination.trim().length < VALIDATION_RULES.minLocationChars) {
      errors.destination = ERROR_MESSAGES.destination.minLength
      isValid = false
    }

    // Date validation
    if (activeTab === 'flights' && flightDateType === 'single') {
      if (!singleFlightDate) {
        errors.dates = ERROR_MESSAGES.dates.flightRequired
        isValid = false
      } else {
        const flightDate = parseDateString(singleFlightDate)
        if (flightDate && flightDate < today) {
          errors.dates = ERROR_MESSAGES.dates.flightPastDate
          isValid = false
        }
      }
    } else {
      if (!dateRangeData.startDate || !dateRangeData.endDate) {
        errors.dates = ERROR_MESSAGES.dates.required
        isValid = false
      } else {
        const startDate = parseDateString(dateRangeData.startDate)
        if (startDate && startDate < today) {
          errors.dates = ERROR_MESSAGES.dates.pastDate
          isValid = false
        } else if (!dateRangeData.nights || dateRangeData.nights < VALIDATION_RULES.minNights) {
          errors.dates = ERROR_MESSAGES.dates.minNights
          isValid = false
        } else if (dateRangeData.nights > VALIDATION_RULES.maxNights) {
          errors.dates = ERROR_MESSAGES.dates.maxNights
          isValid = false
        }
      }
    }

    // Budget validation
    if (budget < BUDGET_CONFIG.min || budget > BUDGET_CONFIG.max) {
      errors.budget = ERROR_MESSAGES.budget.range
      isValid = false
    }

    // Guests validation
    if (!guests || guests < GUESTS_CONFIG.min) {
      errors.guests = ERROR_MESSAGES.guests.required
      isValid = false
    } else if (guests > GUESTS_CONFIG.max) {
      errors.guests = ERROR_MESSAGES.guests.max
      isValid = false
    }

    // Extra info validation (optional but max characters)
    if (extraInfo.length > VALIDATION_RULES.maxExtraInfoChars) {
      errors.extraInfo = ERROR_MESSAGES.extraInfo.maxLength
      isValid = false
    }

    return isValid
  }

  return {
    errors,
    clearErrors,
    clearError,
    validateForm
  }
}
