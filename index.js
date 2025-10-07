const express = require('express');
const cars = require('./cars.json')

const app = express();
app.disable('x-powered-by')
app.use(express.json())

app.get('/cars', (req, res) => {
  res.json(cars)
})



const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})