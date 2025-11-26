export interface SearchTab {
  id: 'hotel' | 'flights' | 'hotel+flights'
  label: string
}

export const SEARCH_TABS: SearchTab[] = [
  { id: 'hotel', label: 'Hotel' },
  { id: 'flights', label: 'Flights' },
  { id: 'hotel+flights', label: 'Hotel + Flights' }
]

export const BUDGET_CONFIG = {
  min: 0,
  max: 5000,
  step: 100,
  default: 2500
}

export interface GuestsConfig {
  min: number
  max: number
  default: number
}

export const GUESTS_CONFIG: GuestsConfig = {
  min: 1,
  max: 10,
  default: 1
}

export interface ValidationRules {
  minLocationChars: number
  maxNights: number
  minNights: number
  maxExtraInfoChars: number
}

export const VALIDATION_RULES: ValidationRules = {
  minLocationChars: 4,
  maxNights: 20,
  minNights: 1,
  maxExtraInfoChars: 200
}

export interface ErrorMessages {
  origin: {
    required: string
    minLength: string
  }
  destination: {
    required: string
    minLength: string
  }
  dates: {
    required: string
    flightRequired: string
    pastDate: string
    flightPastDate: string
    minNights: string
    maxNights: string
  }
  budget: {
    required: string
    min: string
    max: string
  }
  guests: {
    required: string
    min: string
    max: string
  }
}

export const ERROR_MESSAGES: ErrorMessages = {
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
    required: 'Budget is required',
    min: `Budget must be at least ${BUDGET_CONFIG.min}`,
    max: `Budget cannot exceed ${BUDGET_CONFIG.max}`
  },
  guests: {
    required: 'Number of guests is required',
    min: `At least ${GUESTS_CONFIG.min} guest is required`,
    max: `Maximum ${GUESTS_CONFIG.max} guests allowed`
  }
}
