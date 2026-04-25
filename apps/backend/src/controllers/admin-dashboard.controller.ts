import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

export class AdminDashboardController {
    async getDashboardStats(req: Request, res: Response) {
        try {
            const totalUsers = await prisma.customer.count();
            const activeOffers = await prisma.offer.count();
            const activeServices = await prisma.service.count();

            // Since the schema doesn't have Partner, Booking assignment, or Enquiry models yet,
            // we provide dummy data as requested, tagged appropriately.
            const stats = [
                {
                    label: 'Total Users',
                    value: totalUsers,
                    isDummy: false,
                },
                {
                    label: 'Total Partners',
                    value: 42,
                    isDummy: true,
                },
                {
                    label: 'Active Offers',
                    value: activeOffers,
                    isDummy: false,
                },
                {
                    label: 'Active Services',
                    value: activeServices,
                    isDummy: false,
                },
                {
                    label: 'Bookings Assigned',
                    value: 156,
                    isDummy: true,
                },
                {
                    label: 'Bookings Not Assigned',
                    value: 23,
                    isDummy: true,
                },
                {
                    label: 'Open Enquiries',
                    value: 12,
                    isDummy: true,
                },
                {
                    label: 'Monthly Growth',
                    value: '+15%',
                    isDummy: true,
                },
            ];

            res.json(stats);
        } catch (error) {
            console.error('Error fetching dashboard stats:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export const adminDashboardController = new AdminDashboardController();
