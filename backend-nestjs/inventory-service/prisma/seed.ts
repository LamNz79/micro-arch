import { PrismaClient } from '../node_modules/@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';
import { Logger } from '@nestjs/common';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL || 'postgresql://inventory_user:inventory_pass@inventory-db:5432/inventory',
});

const prisma = new PrismaClient({ adapter });
const logger = new Logger('Seed');

async function main() {
    const product = await prisma.product.create({
        data: { name: 'Sample Item', stock: 10 },
    });
    logger.log('Created product: ' + JSON.stringify(product));
}

main()
    .catch((e) => logger.error(e))
    .finally(() => prisma.$disconnect());
