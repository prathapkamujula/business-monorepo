import { Request, Response } from 'express';
import contentService from '../services/content.service';

export class ContentController {
    async getPageContent(req: Request, res: Response) {
        try {
            const pageName = req.params.pageName as string;
            const content = await contentService.getPageContent(pageName);

            if (!content || content.length === 0) {
                return res.status(404).json({ message: `No content found for page: ${pageName}` });
            }

            // Reformat the content to be more easily consumable
            const formattedContent: Record<string, any> = {};
            content.forEach((item) => {
                formattedContent[item.section] = item.content;
            });

            res.status(200).json(formattedContent);
        } catch (error) {
            console.error('Error fetching page content:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async getAllContent(req: Request, res: Response) {
        try {
            const content = await contentService.getAllContent();
            res.status(200).json(content);
        } catch (error) {
            console.error('Error fetching all content:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export default new ContentController();
