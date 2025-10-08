import express from 'express';
// import cars from './cars.json';
import cors from 'cors';
import { carsRouter } from './routes/cars.js';


const app = express();
app.disable('x-powered-by');
app.use(express.json());
app.use(cors());

app.use('/cars', carsRouter)

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
})