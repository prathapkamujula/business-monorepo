import axios from 'axios';
import { IGeocodingService, GeocodingResult } from './geocoding.interface';

export class GoogleGeocodingService implements IGeocodingService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  }

  async reverseGeocode(lat: number, lng: number): Promise<GeocodingResult> {
    if (!this.apiKey) {
      console.warn('GOOGLE_MAPS_API_KEY is not set. Returning mock address.');
      return {
        fullAddress: `Mock Address for (${lat}, ${lng})`,
        city: 'Mock City',
        state: 'Mock State',
        country: 'Mock Country'
      };
    }

    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`
      );

      if (response.data.status !== 'OK') {
        throw new Error(`Google Geocoding API error: ${response.data.status}`);
      }

      const results = response.data.results;
      if (results.length === 0) {
        throw new Error('No results found for these coordinates');
      }

      const result = results[0];
      const addressComponents = result.address_components;

      let city = '';
      let state = '';
      let country = '';

      for (const component of addressComponents) {
        if (component.types.includes('locality')) {
          city = component.long_name;
        } else if (component.types.includes('administrative_area_level_1')) {
          state = component.long_name;
        } else if (component.types.includes('country')) {
          country = component.long_name;
        }
      }

      return {
        fullAddress: result.formatted_address,
        city,
        state,
        country
      };
    } catch (error) {
      console.error('Error in GoogleGeocodingService:', error);
      throw error;
    }
  }
}
