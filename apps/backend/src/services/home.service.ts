import prisma from '../lib/prisma';

export const homeService = {
    async getHomeData() {
        try {
            const [services, offers, bestSellers] = await Promise.all([
                prisma.service.findMany(),
                prisma.offer.findMany(),
                prisma.bestSeller.findMany(),
            ]);

            // Fallback to dummy data if database is empty to ensure frontend still shows something
            // This also allows the user to see it working without manually seeding
            const finalServices =
                services.length > 0
                    ? services
                    : [
                          {
                              id: '1',
                              name: 'Haircut & Styling',
                              icon: 'Scissors',
                              color: '#5856D6',
                              price: 250,
                              mrp: 350,
                              rating: 4.8,
                          },
                          {
                              id: '2',
                              name: 'Electrical Repair',
                              icon: 'Zap',
                              color: '#FF9500',
                              price: 450,
                              mrp: 600,
                              rating: 4.9,
                          },
                          {
                              id: '3',
                              name: 'Car Wash',
                              icon: 'Car',
                              color: '#007AFF',
                              price: 150,
                              mrp: 200,
                              rating: 4.7,
                          },
                          {
                              id: '4',
                              name: 'Home Cleaning',
                              icon: 'HomeIcon',
                              color: '#34C759',
                              price: 350,
                              mrp: 500,
                              rating: 4.9,
                          },
                          {
                              id: '5',
                              name: 'Sofa Cleaning',
                              icon: 'HomeIcon',
                              color: '#AF52DE',
                              price: 800,
                              mrp: 1200,
                              rating: 4.6,
                          },
                          {
                              id: '6',
                              name: 'AC Repairing',
                              icon: 'Zap',
                              color: '#FF3B30',
                              price: 1200,
                              mrp: 1500,
                              rating: 4.9,
                          },
                      ];

            const finalOffers =
                offers.length > 0
                    ? offers
                    : [
                          {
                              id: 'o1',
                              title: 'Flat ₹100 OFF',
                              subtitle: 'On bookings above ₹500',
                              code: 'SAVE100',
                              color: '#FF2D55',
                          },
                          {
                              id: 'o2',
                              title: 'Buy 1 Get 1',
                              subtitle: 'On Beauty Services',
                              code: 'BOGO',
                              color: '#5856D6',
                          },
                          {
                              id: 'o3',
                              title: '50% OFF',
                              subtitle: 'On your first Haircut',
                              code: 'FIRST50',
                              color: '#34C759',
                          },
                      ];

            const finalBestSellers =
                bestSellers.length > 0
                    ? bestSellers
                    : [
                          {
                              id: 'b1',
                              name: 'Deep Home Cleaning',
                              price: 2500,
                              mrp: 3500,
                              rating: 4.9,
                              image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=200',
                          },
                          {
                              id: 'b2',
                              name: 'Salon at Home',
                              price: 999,
                              mrp: 1499,
                              rating: 4.8,
                              image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200',
                          },
                      ];

            return {
                services: finalServices,
                offers: finalOffers,
                bestSellers: finalBestSellers,
                recentlyViewed: [], // Placeholder for now
            };
        } catch (error) {
            console.error('Error fetching home data:', error);
            throw error;
        }
    },
};
