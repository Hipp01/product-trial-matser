import 'reflect-metadata';
import express, { Application } from 'express';
import { AppDataSource } from './data-source';
import { productRouter } from './routes/products';
import * as dotenv from 'dotenv';
import loadInitialData from './data-loader';

// Charger les variables d'environnement depuis le fichier .env
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

const isTest = process.env.NODE_ENV === 'test';

app.use(express.json());

// Initialiser la connexion à la base de données et charger les données initiales
if (!isTest) {
  AppDataSource.initialize()
    .then(async () => {
      console.log("Connexion réussie à la base de données");

      // Charger les données initiales
      await loadInitialData();

      app.get('/', (req, res) => {
        // Retourner les routes sous forme de JSON
        res.json({
          message: "Bienvenue sur l'API de gestion des produits",
          routes: [
            { method: "GET", path: "/products", description: "Récupérer tous les produits" },
            { method: "POST", path: "/products", description: "Ajouter un nouveau produit" },
            { method: "GET", path: "/products/:id", description: "Récupérer un produit par son ID" },
            { method: "PATCH", path: "/products/:id", description: "Mettre à jour un produit par son ID" },
            { method: "DELETE", path: "/products/:id", description: "Supprimer un produit par son ID" }
          ]
        });
      });

      // Utiliser les routes des produits
      app.use('/products', productRouter);

      // Démarrer le serveur
      app.listen(PORT, () => {
        console.log(`Le serveur écoute sur le port ${PORT}`);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la connexion à la base de données", error);
    });
} else {
  app.use('/products', productRouter);
  console.log("Mode test activé");
}

// Exporter l'application pour les tests
export { app };
