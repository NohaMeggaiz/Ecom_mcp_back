"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prismaClient_1 = require("../prismaClient");
const validators_1 = require("../validators");
const zod_1 = require("zod");
const router = express_1.default.Router();
/**
 * GET /products
 * - optional query ?category=Apparel
 */
router.get('/', async (req, res, next) => {
    try {
        const { category } = req.query;
        const where = category ? { category: String(category) } : undefined;
        const products = await prismaClient_1.prisma.product.findMany({
            where,
            orderBy: { id: 'asc' }
        });
        res.json(products);
    }
    catch (err) {
        next(err);
    }
});
/**
 * GET /products/:id
 */
router.get('/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id))
            return res.status(400).json({ error: 'Invalid id' });
        const product = await prismaClient_1.prisma.product.findUnique({ where: { id } });
        if (!product)
            return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    }
    catch (err) {
        next(err);
    }
});
/**
 * POST /products
 * - body: { name, description?, price, category }
 */
router.post('/', async (req, res, next) => {
    try {
        const parsed = validators_1.createProductSchema.parse(req.body);
        const created = await prismaClient_1.prisma.product.create({ data: parsed });
        res.status(201).json(created);
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            return res.status(400).json({ error: 'Validation failed', details: err.issues });
        }
        next(err);
    }
});
exports.default = router;
