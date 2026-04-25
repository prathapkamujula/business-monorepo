import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export class AdminServiceController {
    async getAllServices(req: Request, res: Response) {
        try {
            const services = await prisma.service.findMany({
                include: { details: true },
            });
            res.json(services);
        } catch (error) {
            console.error('Error fetching services:', error);
            res.status(500).json({ message: 'Error fetching services' });
        }
    }

    async updateService(req: Request, res: Response) {
        const id = req.params.id as string;
        const { name, category, price, mrp, rating, icon, image, color, details } = req.body;
        try {
            const service = await prisma.service.update({
                where: { id },
                data: {
                    name,
                    category,
                    price: price !== undefined ? parseFloat(price) : undefined,
                    mrp: mrp !== undefined ? parseFloat(mrp) : undefined,
                    rating: rating !== undefined ? parseFloat(rating) : undefined,
                    icon,
                    image,
                    color,
                    details: details
                        ? {
                              upsert: {
                                  create: { content: details },
                                  update: { content: details },
                              },
                          }
                        : undefined,
                },
                include: { details: true },
            });
            res.json(service);
        } catch (error) {
            console.error('Error updating service:', error);
            res.status(500).json({ message: 'Error updating service' });
        }
    }
}

export const adminServiceController = new AdminServiceController();
