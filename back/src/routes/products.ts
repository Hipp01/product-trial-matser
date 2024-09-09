import { Router, Request, Response } from 'express';
import { Product } from '../entity/Product';
import { AppDataSource } from '../data-source';
import { validate } from 'class-validator';

const router = Router();

// GET /products - Récupérer tous les produits
router.get('/', async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des produits', error });
  }
});

// POST /products - Ajouter un produit
router.post('/', async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const newProduct = productRepository.create(req.body);

    const errors = await validate(newProduct);
    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation échouée', errors });
    }

    await productRepository.save(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du produit', error });
  }
});

// GET /products/:id - Récupérer un produit par son ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id: Number(req.params.id) });

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du produit', error });
  }
});

// PATCH /products/:id - Mettre à jour un produit par son ID
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const product = await productRepository.findOneBy({ id: Number(req.params.id) });

    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    productRepository.merge(product, req.body);
    const updatedProduct = await productRepository.save(product);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du produit', error });
  }
});

// DELETE /products/:id - Supprimer un produit par son ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const result = await productRepository.delete(req.params.id);

    if (result.affected === 0) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    res.status(204).send('Produit supprimé');
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du produit', error });
  }
});

export { router as productRouter };