import { Router, Request, Response } from 'express';
import { Product } from '../models/product';

const router = Router();

// Liste de produits en mémoire
let products: Product[] = [];

// GET /products - Récupérer tous les produits
router.get('/', (req: Request, res: Response) => {
  res.json(products);
});

// POST /products - Ajouter un produit
router.post('/', (req: Request, res: Response) => {
  const newProduct: Product = req.body;

  if (!newProduct.name || !newProduct.price) {
    return res.status(400).send("Le nom et le prix sont obligatoires");
  }

  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  newProduct.createdAt = Date.now();
  newProduct.updatedAt = Date.now();

  products.push(newProduct);

  res.status(201).json(newProduct);
});

// GET /products/:id - Récupérer un produit par son ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé` });
  }

  res.json(product);
});

// PATCH /products/:id - Mettre à jour un produit par son ID
router.patch('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé` });
  }

  const updatedProduct: Partial<Product> = req.body;
  const updatedAt = Date.now();

  Object.assign(product, updatedProduct, { updatedAt });

  res.json(product);
});

// DELETE /products/:id - Supprimer un produit par son ID
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const productIndex = products.findIndex(p => p.id === parseInt(id));

  if (productIndex === -1) {
    return res.status(404).json({ message: `Produit avec l'ID ${id} non trouvé` });
  }

  products.splice(productIndex, 1);

  res.status(204).send();
});

export default router;
