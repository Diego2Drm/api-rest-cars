import { Router } from 'express'
import { validateCar, validatePartialCar } from '../schemas/carScehmas.js';
import { CarModel } from '../models/car.js';

export const carsRouter = Router();

// GET ALL AND BY BRAND
carsRouter.get('/', async (req, res) => {
  const { brand } = req.query;
  const cars = await CarModel.getAll({ brand });

  if (cars.length === 0) {
    res.status(400).json({ message: 'Brand not Found' })
  }
  res.json(cars)
})

// GET BY ID
carsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const carById = await CarModel.getById({ id });
  if (carById) return res.json(carById);
  res.status(400).json({ message: 'Car not found' })

})

// POST CAR
carsRouter.post('/', async (req, res) => {
  const result = validateCar(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newCar = await CarModel.create({ input: result.data })

  res.status(201).json(newCar)
})

// PATCH CAR
carsRouter.patch('/:id', async (req, res) => {
  const result = validatePartialCar(req.body);

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params;
  const updateCar = await CarModel.update({ id, input: result.data })

  return res.json(updateCar)
})


// DELETE CAR
carsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleteCar = await CarModel.delete({ id })
  if (deleteCar === -1) {
    return res.status(401).json({ message: 'Car not found' })
  }
  return res.json({ message: 'Car delete' })
})