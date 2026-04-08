import { auth as firebaseAuth } from '../config/firebase';

export class AuthService {
    async verifyIdToken(idToken: string) {
        try {
            const decodedToken = await firebaseAuth.verifyIdToken(idToken);
            return decodedToken;
        } catch (error) {
            console.error('Error verifying token:', error);
            throw new Error('Unauthorized');
        }
    }

    async handleGoogleSignin(idToken: string) {
        const decodedToken = await this.verifyIdToken(idToken);
        // Here you would typically check if user exists in DB, create if not
        return decodedToken;
    }

    async handleGoogleSignup(idToken: string) {
        const decodedToken = await this.verifyIdToken(idToken);
        // Handle signup logic (e.g., save to Prisma)
        return decodedToken;
    }
}

export const authService = new AuthService();
