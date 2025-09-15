import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { name: 'Blue T-Shirt', description: 'Soft cotton tee', price: 19.99, category: 'Apparel' },
      { name: 'Running Shoes', description: 'Lightweight running shoes', price: 79.99, category: 'Footwear' },
      { name: 'Baseball Cap', description: 'Adjustable cap', price: 12.5, category: 'Apparel' },
      { name: 'Coffee Mug', description: '350ml ceramic mug', price: 8.0, category: 'Home' }
    ],
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
