/**
 * Hotel API Response Types
 * These interfaces match the structure returned by the hotel search API
 */

export interface HotelLocation {
  city: string
  country: string
}

export interface HotelInfo {
  code: string
  name: string
  stars: number
  location: HotelLocation
}

export interface RoomPrice {
  total: string
  currency: string
}

export interface BedInfo {
  type: string
  count: number
}

export interface ServiceInfo {
  code: string
  description: string
  type: string
}

export interface MealPlan {
  code: string
  description: string
}

export interface CancelPenaltyValue {
  value: string
  decimals: number
  currency: {
    iso_currency: string
    currency: string
  }
}

export interface CancelPenalty {
  valid_for_rate_plans: string[]
  datetime_range: {
    start: { seconds: string; nanos: number }
    end: { seconds: string; nanos: number }
  }
  value: CancelPenaltyValue
  description: string
}

export interface CancellationPolicy {
  complex_cancel_penalties: {
    cancel_penalties: CancelPenalty[]
  }
  policy_type: string
}

export interface RoomResult {
  roomCode: string
  roomName: string
  originalRoomName: string
  price: RoomPrice
  remainingUnits: number
  hotel: HotelInfo
  mealPlan: MealPlan
  beds: BedInfo[]
  services: ServiceInfo[]
  cancellationPolicy: CancellationPolicy
}

export interface HotelSearchResponse {
  searchId: string
  rooms: RoomResult[]
}

/**
 * Props interface for HotelCard component
 */
export interface HotelCardProps {
  room: RoomResult
}
