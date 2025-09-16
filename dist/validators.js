"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().nonnegative(),
    category: zod_1.z.string().min(1),
    imageUrl: zod_1.z.string().url().optional(),
    inStock: zod_1.z.boolean().optional()
});
