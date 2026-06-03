import prisma from '../lib/prisma';

export const checkDbConnection = async (): Promise<boolean> => {
    await prisma.$queryRaw`SELECT 1`;
    return true;
};
