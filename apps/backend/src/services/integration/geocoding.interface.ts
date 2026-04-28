export interface GeocodingResult {
  fullAddress: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface IGeocodingService {
  reverseGeocode(lat: number, lng: number): Promise<GeocodingResult>;
}
