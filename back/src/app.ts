import express, { Request, Response } from 'express';
import { Product } from './models/product';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
    res.send(`
      <h1>Bienvenue sur l'API de gestion des produits</h1>
      <h2>Routes disponibles :</h2>
      <ul>
        <li><a href="/products">GET /products - Récupérer tous les produits</a></li>
        <li>POST /products - Ajouter un nouveau produit</li>
      </ul>
    `);
});


// Liste de produits en mémoire
let products: Product[] = [];

// GET - Récupérer tous les produits
app.get('/products', (req: Request, res: Response) => {
  res.json(products);
});

// POST - Ajouter un produit
app.post('/products', (req: Request, res: Response) => {
  const newProduct: Product = req.body;

  if (!newProduct.name || !newProduct.price) {
    return res.status(400).send("Le nom et le prix sont obligatoires");
  }

  // Générer un ID unique pour le produit
  newProduct.id = products.length ? products[products.length - 1].id + 1 : 1;
  newProduct.createdAt = Date.now();
  newProduct.updatedAt = Date.now();

  // Ajouter le produit à la liste
  products.push(newProduct);

  // Retourner le produit créé
  res.status(201).json(newProduct);
});

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
