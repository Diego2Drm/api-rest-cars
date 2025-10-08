const express = require('express');
const cars = require('./cars.json')
const crypto = require('node:crypto');
const cors = require('cors');
const { validateCar, validatePartialCar } = require('./schemas/carScehmas');

const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

// GET ALL AND BY BRAND
app.get('/cars', (req, res) => {
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
app.get('/cars/:id', (req, res) => {
  const { id } = req.params

  const carById = cars.find(car => car.id === id)
  if (carById) return res.json(carById);

  res.status(400).json({ message: 'Car not found' })

})

// POST CAR
app.post('/cars', (req, res) => {
  const result = validateCar(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newCar = {
    id: crypto.randomUUID(),
    ...result.data
  }

  cars.push(newCar);
  res.status(201).json(newCar)
})

// PATCH CAR
app.patch('/cars/:id', (req, res) => {
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
app.delete('/cars/:id', (req, res) => {
  const { id } = req.params;
  const deleteCar = cars.findIndex(car => car.id === id);

  if (deleteCar === -1) {
    return res.status(401).json({ message: 'Car not found' })
  }

  cars.splice(deleteCar, 1)
  return res.json({ message: 'Car delete' })

})
const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})