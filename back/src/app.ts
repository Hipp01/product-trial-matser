import express, { Application } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/products';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Définir les routes principales
app.get('/', (req, res) => {
  res.send(`
    <h1>Bienvenue sur l'API de gestion des produits</h1>
    <h2>Routes disponibles :</h2>
    <ul>
      <li>GET /products - Récupérer tous les produits</li>
      <li>POST /products - Ajouter un nouveau produit</li>
      <li>GET /products/:id - Récupérer un produit par son ID</li>
      <li>PATCH /products/:id - Mettre à jour un produit par son ID</li>
      <li>DELETE /products/:id - Supprimer un produit par son ID</li>
    </ul>
  `);
});

// Utiliser les routes des produits
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
