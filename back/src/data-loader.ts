import fs from 'fs';
import path from 'path';
import { AppDataSource } from './data-source';
import { Product } from './entity/Product';

const loadInitialData = async () => {
  try {
    const filePath = path.join(__dirname, 'assets/products.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData);

    const updatedProducts = products.map((product: any) => ({
      ...product,
      createdAt: parseInt(product.createdAt, 10),
      updatedAt: parseInt(product.updatedAt, 10),
      quantity: product.quantity !== undefined ? Number(product.quantity) : 0,
    }));    

    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const productRepository = AppDataSource.getRepository(Product);
    await productRepository.clear();

    await productRepository.save(updatedProducts);
    console.log('Données initialisées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation des données', error);
  }
};

export default loadInitialData;
