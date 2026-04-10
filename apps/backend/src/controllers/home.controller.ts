import { Request, Response } from 'express';
import { homeService } from '../services/home.service';

export const homeController = {
    async getHomeData(req: Request, res: Response) {
        try {
            const data = await homeService.getHomeData();
            res.json(data);
        } catch (error) {
            console.error('Error in getHomeData controller:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },
};
