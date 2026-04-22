import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export class AdminOfferController {
    async getAllOffers(req: Request, res: Response) {
        try {
            const offers = await prisma.offer.findMany({
                include: { details: true },
            });
            res.json(offers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching offers' });
        }
    }

    async createOffer(req: Request, res: Response) {
        const { title, subtitle, code, color, details } = req.body;
        try {
            const offer = await prisma.offer.create({
                data: {
                    title,
                    subtitle,
                    code,
                    color,
                    details: details ? { create: { content: details } } : undefined,
                },
                include: { details: true },
            });
            res.json(offer);
        } catch (error) {
            res.status(500).json({ message: 'Error creating offer' });
        }
    }

    async updateOffer(req: Request, res: Response) {
        const id = req.params.id as string;
        const { title, subtitle, code, color, details } = req.body;
        try {
            const offer = await prisma.offer.update({
                where: { id },
                data: {
                    title,
                    subtitle,
                    code,
                    color,
                    details: details ? {
                        upsert: {
                            create: { content: details },
                            update: { content: details }
                        }
                    } : undefined,
                },
                include: { details: true },
            });
            res.json(offer);
        } catch (error) {
            console.error('Error updating offer:', error);
            res.status(500).json({ message: 'Error updating offer' });
        }
    }
}

export const adminOfferController = new AdminOfferController();
