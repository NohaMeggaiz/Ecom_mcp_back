import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();
const port = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.use('/products', productsRouter);

app.get('/', (req, res) => res.send('E-commerce Product API'));

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
