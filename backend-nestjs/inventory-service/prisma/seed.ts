import { PrismaClient } from '../node_modules/@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL || 'postgresql://inventory_user:inventory_pass@inventory-db:5432/inventory',
});

const prisma = new PrismaClient({ adapter });

async function main() {
    const product = await prisma.product.create({
        data: { name: 'Sample Item', stock: 10 },
    });
    console.log('Created product:', product);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
