import { Router } from 'express'
import { CarCrontoller } from '../controllers/CarsConrollers.js';
export const carsRouter = Router();

// GET ALL AND BY BRAND
carsRouter.get('/', CarCrontoller.getAll)

// GET BY ID
carsRouter.get('/:id', CarCrontoller.getById)

// POST CAR
carsRouter.post('/', CarCrontoller.create)

// PATCH CAR
carsRouter.patch('/:id', CarCrontoller.update)


// DELETE CAR
carsRouter.delete('/:id', CarCrontoller.delete)