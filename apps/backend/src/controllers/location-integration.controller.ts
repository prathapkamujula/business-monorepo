import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { IGeocodingService } from '../services/integration/geocoding.interface';
import { GoogleGeocodingService } from '../services/integration/google-geocoding.service';

export class LocationIntegrationController {
  private geocodingService: IGeocodingService;

  constructor(geocodingService: IGeocodingService = new GoogleGeocodingService()) {
    this.geocodingService = geocodingService;
  }

  resolveCoordinates = async (req: Request, res: Response) => {
    try {
      const { latitude, longitude } = req.body;
      const customerId = (req as any).user?.uid;

      if (!latitude || !longitude) {
        return res.status(400).json({ message: 'Latitude and longitude are required' });
      }

      if (!customerId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Check if address already exists for these coordinates and user (optional, but requested "first check on this addresses database")
      const existingAddress = await prisma.address.findFirst({
        where: {
          customerId,
          latitude,
          longitude
        }
      });

      if (existingAddress) {
        return res.status(200).json(existingAddress);
      }

      // Resolve coordinates using geocoding service
      const resolved = await this.geocodingService.reverseGeocode(latitude, longitude);

      // Save to database
      const newAddress = await prisma.address.create({
        data: {
          customerId,
          latitude,
          longitude,
          fullAddress: resolved.fullAddress,
          city: resolved.city,
          state: resolved.state,
          country: resolved.country,
          isDefault: true // Setting as default for now since it's the landing page location
        }
      });

      return res.status(201).json(newAddress);
    } catch (error) {
      console.error('Error resolving coordinates:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  getCustomerAddress = async (req: Request, res: Response) => {
    try {
      const customerId = (req as any).user?.uid;

      if (!customerId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const address = await prisma.address.findFirst({
        where: {
          customerId,
          isDefault: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return res.status(200).json(address || null);
    } catch (error) {
      console.error('Error getting customer address:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}

export const locationIntegrationController = new LocationIntegrationController();
