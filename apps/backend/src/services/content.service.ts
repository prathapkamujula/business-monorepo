import prisma from '../lib/prisma';

export class ContentService {
    async getPageContent(pageName: string) {
        return prisma.cMSPageContent.findMany({
            where: {
                pageName,
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
    }

    async getAllContent() {
        return prisma.cMSPageContent.findMany();
    }

    // Helper method for seeding or updating content
    async upsertContent(pageName: string, section: string, content: any) {
        const existing = await prisma.cMSPageContent.findFirst({
            where: {
                pageName,
                section,
            },
        });

        if (existing) {
            return prisma.cMSPageContent.update({
                where: { id: existing.id },
                data: { content },
            });
        } else {
            return prisma.cMSPageContent.create({
                data: {
                    pageName,
                    section,
                    content,
                },
            });
        }
    }
}

export default new ContentService();
