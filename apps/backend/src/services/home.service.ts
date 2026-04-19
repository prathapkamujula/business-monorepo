import prisma from '../lib/prisma';

export const homeService = {
    async getHomeData() {
        try {
            const [services, offers, bestSellers] = await Promise.all([
                prisma.service.findMany(),
                prisma.offer.findMany({
                    include: {
                        details: true,
                    },
                }),
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
                              details: {
                                  content: {
                                      description: 'Get flat ₹100 off on all services above ₹500.',
                                      terms: [
                                          'Valid once per user',
                                          'Minimum booking value ₹500',
                                          'Valid till end of month',
                                      ],
                                      faqs: [
                                          {
                                              question: 'How to use?',
                                              answer: 'Apply code SAVE100 at checkout.',
                                          },
                                          {
                                              question: 'Is it valid for all services?',
                                              answer: 'Yes, on all services above ₹500.',
                                          },
                                      ],
                                  },
                              },
                          },
                          {
                              id: 'o2',
                              title: 'Buy 1 Get 1',
                              subtitle: 'On Beauty Services',
                              code: 'BOGO',
                              color: '#5856D6',
                              details: {
                                  content: {
                                      description:
                                          'Buy one beauty service and get another one free.',
                                      terms: [
                                          'Valid on selected beauty services',
                                          'Cheaper service will be free',
                                      ],
                                      faqs: [
                                          {
                                              question: 'Which services?',
                                              answer: 'All salon and beauty services.',
                                          },
                                      ],
                                  },
                              },
                          },
                          {
                              id: 'o3',
                              title: '50% OFF',
                              subtitle: 'On your first Haircut',
                              code: 'FIRST50',
                              color: '#34C759',
                              details: {
                                  content: {
                                      description: 'First time users get 50% off on haircut.',
                                      terms: ['New users only', 'Maximum discount ₹200'],
                                      faqs: [
                                          {
                                              question: 'Is it for kids?',
                                              answer: 'Yes, valid for all age groups.',
                                          },
                                      ],
                                  },
                              },
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
    async getOfferDetails(id: string) {
        return prisma.offer.findUnique({
            where: { id },
            include: {
                details: true,
            },
        });
    },
};
