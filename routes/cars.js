import {Router} from 'express'
import { randomUUID } from 'node:crypto';
import { validateCar, validatePartialCar } from '../schemas/carScehmas.js';
import { createRequire } from 'node:module';

export const carsRouter = Router();

const require = createRequire(import.meta.url);
const cars = require('../cars.json');
// GET ALL AND BY BRAND
carsRouter.get('/', (req, res) => {
  const { brand } = req.query;

  if (brand) {
    const filteredCars = cars.filter(car =>
      car.brand.toLocaleLowerCase() === brand.toLocaleLowerCase()
    )
    if (filteredCars.length === 0) {
      res.status(400).json({ message: 'Brand not Found' })
    }
    return res.json(filteredCars)
  }

  res.json(cars)
})

// GET BY ID
carsRouter.get('/:id', (req, res) => {
  const { id } = req.params

  const carById = cars.find(car => car.id === id)
  if (carById) return res.json(carById);

  res.status(400).json({ message: 'Car not found' })

})

// POST CAR
carsRouter.post('/', (req, res) => {
  const result = validateCar(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newCar = {
    id: randomUUID(),
    ...result.data
  }

  cars.push(newCar);
  res.status(201).json(newCar)
})

// PATCH CAR
carsRouter.patch('/:id', (req, res) => {
  const result = validatePartialCar(req.body);
  const { id } = req.params;

  const carIndex = cars.findIndex(car => car.id === id);
  if (carIndex === -1) {
    res.status(400).json({ message: 'Car not found' })
  }

  const updateCar = {
    ...cars[carIndex],
    ...result.data,
  }

  cars[carIndex] = updateCar
  return res.json(updateCar)
})


// DELETE CAR
carsRouter.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteCar = cars.findIndex(car => car.id === id);

  if (deleteCar === -1) {
    return res.status(401).json({ message: 'Car not found' })
  }

  cars.splice(deleteCar, 1)
  return res.json({ message: 'Car delete' })

})