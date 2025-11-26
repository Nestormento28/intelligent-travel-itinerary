/**
 * Search form constants and configuration
 */

// Tab definitions
export const SEARCH_TABS = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'flights', label: 'Flights' },
  { id: 'hotel+flights', label: 'Hotel + Flights' }
]

// Budget configuration
export const BUDGET_CONFIG = {
  min: 0,
  max: 5000,
  step: 100,
  default: 2500
}

// Guest configuration
export const GUESTS_CONFIG = {
  min: 1,
  max: 10,
  default: 1
}

// Validation rules
export const VALIDATION_RULES = {
  minLocationChars: 4,
  maxNights: 20,
  minNights: 1,
  maxExtraInfoChars: 200
}

// Error messages
export const ERROR_MESSAGES = {
  origin: {
    required: 'Origin is required',
    minLength: `Origin must be at least ${VALIDATION_RULES.minLocationChars} characters`
  },
  destination: {
    required: 'Destination is required',
    minLength: `Destination must be at least ${VALIDATION_RULES.minLocationChars} characters`
  },
  dates: {
    required: 'Please select both dates',
    flightRequired: 'Flight date is required',
    pastDate: 'Dates cannot be in the past',
    flightPastDate: 'Flight date cannot be in the past',
    minNights: `Please select at least ${VALIDATION_RULES.minNights} night`,
    maxNights: `Maximum stay is ${VALIDATION_RULES.maxNights} nights`
  },
  budget: {
    range: `Budget must be between \u20AC${BUDGET_CONFIG.min} and \u20AC${BUDGET_CONFIG.max.toLocaleString()}`
  },
  guests: {
    required: `At least ${GUESTS_CONFIG.min} guest is required`,
    max: `Maximum ${GUESTS_CONFIG.max} guests allowed`
  },
  extraInfo: {
    maxLength: `Extra info must be ${VALIDATION_RULES.maxExtraInfoChars} characters or less`
  }
}
