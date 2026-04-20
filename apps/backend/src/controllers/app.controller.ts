import { Request, Response } from 'express';
import { appService } from '../services/app.service';

export class AppController {
    getHome(req: Request, res: Response) {
        res.send('Backend is running');
    }

    async getSystemParameters(req: Request, res: Response) {
        try {
            const parameters = await appService.getSystemParameters();
            res.json(parameters);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch system parameters' });
        }
    }

    getProtected(req: Request, res: Response) {
        const user = (req as any).user;
        res.json({
            message: 'This is protected data from the backend',
            user: {
                uid: user.uid,
                email: user.email,
            },
            timestamp: new Date().toISOString(),
        });
    }
}

export const appController = new AppController();
