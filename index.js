const express = require('express');
const cars = require('./cars.json')
const crypto = require('node:crypto');
const { validateCar } = require('./schemas/carScehmas');

const app = express();
app.disable('x-powered-by')
app.use(express.json())

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


const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})