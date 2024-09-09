import request from 'supertest';
import { Application } from 'express';
import { AppDataSource } from '../src/data-source';
import { app } from '../src/app';
import { Product } from '../src/entity/Product';

describe('Product API', () => {
  let server: Application;

  beforeAll(async () => {
    if (process.env.NODE_ENV !== 'test') {
      await AppDataSource.initialize();
    }
    server = app;
  });

  afterAll(async () => {
    // Supprime tous les produits
    await AppDataSource.getRepository(Product).clear();

    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });

  it('should fetch all products', async () => {
    const response = await request(server).get('/products');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should add a new product', async () => {
    const newProduct = {
      code: 'P001',
      name: 'Test Product',
      description: 'A product for testing',
      image: 'image_url',
      category: 'category',
      price: 11,
      quantity: 100,
      internalReference: 'REF001',
      shellId: 1,
      inventoryStatus: 'INSTOCK',
      rating: 4,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    };

    const response = await request(server).post('/products').send(newProduct);
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      ...newProduct,
      price: expect.any(Number),
      rating: expect.any(Number),
    });
    expect(Number.isInteger(response.body.price)).toBe(true);
    expect(Number.isInteger(response.body.rating)).toBe(true);
  });

  it('should fetch a product by ID', async () => {
    // Création d'un nouveau produit
    const newProduct = await request(server).post('/products').send({
      code: 'P002',
      name: 'Product to Fetch',
      description: 'Fetch this product',
      image: 'image_url',
      category: 'category',
      price: 199,
      quantity: 50,
      internalReference: 'REF002',
      shellId: 2,
      inventoryStatus: 'LOWSTOCK',
      rating: 4,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });

    const response = await request(server).get(`/products/${newProduct.body.id}`);
    expect(response.status).toBe(200);

    const fetchedProduct = response.body;

    const convertedFetchedProduct = {
      ...fetchedProduct,
      createdAt: parseInt(fetchedProduct.createdAt, 10),
      updatedAt: parseInt(fetchedProduct.updatedAt, 10),
      price: parseInt(fetchedProduct.price, 10),
      rating: parseInt(fetchedProduct.rating, 10),
    };

    const expectedProduct = {
      ...newProduct.body,
      price: newProduct.body.price,
      rating: newProduct.body.rating,
    };

    // Vérifier que les produits récupérés et attendus sont les mêmes après conversion
    expect(convertedFetchedProduct).toMatchObject(expectedProduct);
    expect(Number.isInteger(convertedFetchedProduct.price)).toBe(true);
    expect(Number.isInteger(convertedFetchedProduct.rating)).toBe(true);
    expect(Number.isInteger(convertedFetchedProduct.createdAt)).toBe(true);
    expect(Number.isInteger(convertedFetchedProduct.updatedAt)).toBe(true);
  });

  it('should update a product by ID', async () => {
    const newProduct = await request(server).post('/products').send({
      code: 'P003',
      name: 'Product to Update',
      description: 'Update this product',
      image: 'image_url',
      category: 'category',
      price: 29,
      quantity: 75,
      internalReference: 'REF003',
      shellId: 3,
      inventoryStatus: 'OUTOFSTOCK',
      rating: 3,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });

    const updatedProductData = {
      name: 'Updated Product Name',
      price: 34,
    };

    const response = await request(server).patch(`/products/${newProduct.body.id}`).send(updatedProductData);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(updatedProductData.name);
    expect(response.body.price).toBe(updatedProductData.price);
    expect(Number.isInteger(response.body.price)).toBe(true);
  });

  it('should delete a product by ID', async () => {
    const newProduct = await request(server).post('/products').send({
      code: 'P004',
      name: 'Product to Delete',
      description: 'Delete this product',
      image: 'image_url',
      category: 'category',
      price: 49,
      quantity: 10,
      internalReference: 'REF004',
      shellId: 4,
      inventoryStatus: 'INSTOCK',
      rating: 2,
      createdAt: Math.floor(Date.now() / 1000),
      updatedAt: Math.floor(Date.now() / 1000),
    });

    const response = await request(server).delete(`/products/${newProduct.body.id}`);
    expect(response.status).toBe(204);

    const fetchResponse = await request(server).get(`/products/${newProduct.body.id}`);
    expect(fetchResponse.status).toBe(404);
  });
});
