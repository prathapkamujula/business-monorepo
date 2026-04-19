import prisma from '../lib/prisma';

export const homeService = {
    async getHomeData() {
        try {
            const [allServices, offers] = await Promise.all([
                prisma.service.findMany({
                    include: {
                        details: true,
                    },
                }),
                prisma.offer.findMany({
                    include: {
                        details: true,
                    },
                }),
            ]);

            // Categorize services
            const featuredServices = allServices.filter((s) => s.category === 'featured');
            const bestSellers = allServices.filter((s) => s.category === 'best-seller');

            // Fallback to dummy data if database is empty to ensure frontend still shows something
            const finalServices =
                featuredServices.length > 0
                    ? featuredServices
                    : [
                          {
                              id: '1',
                              name: 'Haircut & Styling',
                              icon: 'Scissors',
                              color: '#5856D6',
                              category: 'featured',
                              price: 250,
                              mrp: 350,
                              rating: 4.8,
                              details: {
                                  content: {
                                      description:
                                          'Professional haircut and styling by our expert barbers.',
                                      benefits: [
                                          'Modern cuts',
                                          'Expert styling',
                                          'Premium products',
                                      ],
                                      howItWorks: [
                                          'Book your slot',
                                          'Visit the salon',
                                          'Get styled',
                                      ],
                                      faqs: [
                                          {
                                              question: 'Is washing included?',
                                              answer: 'Yes, it is included.',
                                          },
                                      ],
                                  },
                              },
                          },
                          {
                              id: '2',
                              name: 'Electrical Repair',
                              icon: 'Zap',
                              color: '#FF9500',
                              category: 'featured',
                              price: 450,
                              mrp: 600,
                              rating: 4.9,
                              details: {
                                  content: {
                                      description: 'Reliable electrical repair services.',
                                      benefits: ['Safety first', 'Certified electricians'],
                                      howItWorks: ['Report issue', 'Visit by tech', 'Fixing'],
                                  },
                              },
                          },
                          {
                              id: '4',
                              name: 'Home Cleaning',
                              icon: 'HomeIcon',
                              color: '#34C759',
                              category: 'featured',
                              price: 350,
                              mrp: 500,
                              rating: 4.9,
                              details: {
                                  content: {
                                      description: 'Professional home cleaning services.',
                                      benefits: ['Eco-friendly', 'Deep clean'],
                                      howItWorks: ['Book', 'Cleaning crew arrives', 'Clean home'],
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
                              category: 'best-seller',
                              price: 2500,
                              mrp: 3500,
                              rating: 4.9,
                              image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=200',
                              details: {
                                  content: {
                                      description: 'Our top-rated deep home cleaning service.',
                                      benefits: ['All corners covered', 'Heavy stain removal'],
                                      howItWorks: ['Full assessment', 'Deep scrub', 'Sanitization'],
                                  },
                              },
                          },
                          {
                              id: 'b2',
                              name: 'Salon at Home',
                              category: 'best-seller',
                              price: 999,
                              mrp: 1499,
                              rating: 4.8,
                              image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=200',
                              details: {
                                  content: {
                                      description:
                                          'Experience professional salon services at home.',
                                      benefits: ['Convenient', 'Expert beauticians'],
                                      howItWorks: [
                                          'Select service',
                                          'Pro arrives',
                                          'Relax at home',
                                      ],
                                  },
                              },
                          },
                      ];

            const finalOffers =
                offers.length > 0
                    ? offers
                    : [
                          {
                              id: 'o1',
                              title: 'Upto 50% Off',
                              subtitle: 'on first booking',
                              code: 'FIRST50',
                              color: '#5856D6',
                              details: {
                                  content: {
                                      description:
                                          'Get up to 50% off on your first booking with us!',
                                      terms: [
                                          'Valid for first-time users only',
                                          'Minimum booking value ₹500',
                                          'Maximum discount ₹250',
                                      ],
                                      faqs: [
                                          {
                                              question: 'How do I use this?',
                                              answer: 'Apply the code during checkout.',
                                          },
                                      ],
                                  },
                              },
                          },
                          {
                              id: 'o2',
                              title: 'Flat ₹100 Off',
                              subtitle: 'on Salon services',
                              code: 'SALON100',
                              color: '#FF2D55',
                              details: {
                                  content: {
                                      description: 'Flat ₹100 discount on all Salon services.',
                                      terms: [
                                          'Valid on Salon at home categories',
                                          'Minimum booking value ₹999',
                                      ],
                                  },
                              },
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
    async getServiceDetails(id: string) {
        return prisma.service.findUnique({
            where: { id },
            include: {
                details: true,
            },
        });
    },
};
