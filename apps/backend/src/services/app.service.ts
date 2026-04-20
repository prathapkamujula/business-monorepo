import prisma from '../lib/prisma';

export const appService = {
    async getSystemParameters() {
        const params = await prisma.systemParameter.findMany({
            where: {
                isActive: true,
            },
        });

        // Convert array to object for easier consumption
        return params.reduce((acc: any, param) => {
            acc[param.key] =
                param.value === 'true' ? true : param.value === 'false' ? false : param.value;
            return acc;
        }, {});
    },
};
