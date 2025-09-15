import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const products = [
  {
    name: "Women's Cherry Print Tee Shirt Short Sleeve",
    description: 'Soft and skin-friendly material offers medium stretch for a comfortable wearing feeling',
    price: 19.99,
    imageUrl: 'https://m.media-amazon.com/images/I/61HxNTPQd2L._AC_SY500_.jpg',
    category: 'Apparel',
    inStock: true,
  },
  {
    name: 'Sport Hoodie',
    description: 'Stand up collar, thumb holes and zipper pockets. Athletic stand up collar provides extra sun protection for your neck.',
    price: 49.5,
    imageUrl: 'https://m.media-amazon.com/images/I/51JDeM6cOwL._AC_SY500_.jpg',
    category: 'Apparel',
    inStock: false,
  },
  {
    name: 'Coffee Mug',
    description: 'Designed with a thick, textured C-shaped handle, this mug provides a secure grip and heat insulation. The 350ml (12 oz) capacity balances usability for coffee, tea, milk or cold drinks like water, beer, juice, cola etc. making it ideal for home kitchens, offices, or outdoor use',
    price: 9.5,
    imageUrl: 'https://m.media-amazon.com/images/I/51YqxpOa+OL._AC_SX679_.jpg',
    category: 'Home',
    inStock: true,
  }
];
async function main() {
  // await prisma.product.createMany({
  //   data: [
  //     { name: 'Blue T-Shirt', description: 'Soft cotton tee', price: 19.99, category: 'Apparel' },
  //     { name: 'Running Shoes', description: 'Lightweight running shoes', price: 79.99, category: 'Footwear' },
  //     { name: 'Baseball Cap', description: 'Adjustable cap', price: 12.5, category: 'Apparel' },
  //     { name: 'Coffee Mug', description: '350ml ceramic mug', price: 8.0, category: 'Home' }
  //   ],
  // });

    // Clear existing products
  await prisma.product.deleteMany();

  // Insert new products
  await prisma.product.createMany({ data: products });
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
