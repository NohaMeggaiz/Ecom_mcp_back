import express from 'express';
import { prisma } from '../prismaClient';
import { createProductSchema } from '../validators';
import { ZodError } from 'zod';

const router = express.Router();

/**
 * GET /products
 * - optional query ?category=Apparel
 */
router.get('/', async (req, res, next) => {
  try {
    const { category } = req.query;
    const where = category ? { category: String(category) } : undefined;
    const products = await prisma.product.findMany({
      where,
      orderBy: { id: 'asc' }
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /products/:id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ error: 'Product not found' });

    res.json(product);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /products
 * - body: { name, description?, price, category }
 */
router.post('/', async (req, res, next) => {
  try {
    const parsed = createProductSchema.parse(req.body);
    const created = await prisma.product.create({ data: parsed });
    res.status(201).json(created);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.issues });
    }
    next(err);
  }
});

export default router;
