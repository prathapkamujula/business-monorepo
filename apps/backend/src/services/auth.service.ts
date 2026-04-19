import { auth as firebaseAuth } from '../config/firebase';
import prisma from '../lib/prisma';

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

    private async syncCustomerWithDb(decodedToken: any) {
        const { uid, email, name, picture, phone_number, email_verified } = decodedToken;

        let existingCustomer = await prisma.customer.findUnique({
            where: { id: uid },
        });

        if (!existingCustomer && email) {
            existingCustomer = await prisma.customer.findUnique({
                where: { email: email },
            });
        }

        if (existingCustomer) {
            if (existingCustomer.id !== uid) {
                return prisma.$transaction(async (tx) => {
                    await tx.customer.delete({
                        where: { id: existingCustomer!.id },
                    });

                    return tx.customer.create({
                        data: {
                            id: uid,
                            email: email!,
                            name: name || existingCustomer!.name,
                            photoUrl: picture || existingCustomer!.photoUrl,
                            phoneNumber: phone_number || existingCustomer!.phoneNumber,
                            emailVerified: email_verified,
                            lastLoginAt: new Date(),
                        },
                    });
                });
            }

            return prisma.customer.update({
                where: { id: uid },
                data: {
                    lastLoginAt: new Date(),
                    email: email,
                    photoUrl: picture,
                    emailVerified: email_verified,
                },
            });
        }

        return prisma.customer.create({
            data: {
                id: uid,
                email: email!,
                name: name,
                photoUrl: picture,
                phoneNumber: phone_number,
                emailVerified: email_verified,
                lastLoginAt: new Date(),
            },
        });
    }

    async handleGoogleSignin(idToken: string) {
        const decodedToken = await this.verifyIdToken(idToken);
        const customer = await this.syncCustomerWithDb(decodedToken);
        return { ...decodedToken, customer };
    }

    async handleGoogleSignup(idToken: string) {
        const decodedToken = await this.verifyIdToken(idToken);
        const customer = await this.syncCustomerWithDb(decodedToken);
        return { ...decodedToken, customer };
    }
}

export const authService = new AuthService();