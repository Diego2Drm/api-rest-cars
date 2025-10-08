const express = require('express');
const cars = require('./cars.json')

const app = express();
app.disable('x-powered-by')
app.use(express.json())

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

app.get('/cars/:id', (req, res) => {
  const { id } = req.params

  const carById = cars.find(car => car.id === id)
  if (carById) return res.json(carById);

  res.status(400).json({ message: 'Car not found' })

})


const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})