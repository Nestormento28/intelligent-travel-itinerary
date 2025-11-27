/**
 * Hotel API Response Types
 * These interfaces match the structure returned by the hotel search API
 */

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface HotelLocation {
  city: string
  coordinates: Coordinates
}

export interface HotelContact {
  phone: string
  email: string
}

export interface HotelInfo {
  name: string
  stars: number
  location: HotelLocation
  contact: HotelContact
}

export interface RoomPrice {
  total: string
  currency: string
}

export interface RoomResult {
  roomName: string
  price: RoomPrice
  hotel: HotelInfo
}

export interface HotelSearchResponse {
  searchId: string
  rooms: RoomResult[]
}

/**
 * Props interface for HotelCard component
 * Derived from RoomResult for easier component usage
 */
export interface HotelCardProps {
  roomName: string
  price: RoomPrice
  hotel: HotelInfo
}
