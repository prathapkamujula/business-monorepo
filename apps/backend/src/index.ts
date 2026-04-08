import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import appRoutes from './routes/app.routes';
import authRoutes from './routes/auth.routes';
import prisma from './lib/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/', appRoutes);
app.use('/auth', authRoutes);

const startServer = async () => {
    try {
        await prisma.$connect();
        console.log('Successfully connected to the database');

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(
            'Failed to connect to the database. Please check your database connection and try again.'
        );
        process.exit(1);
    }
};

startServer();
