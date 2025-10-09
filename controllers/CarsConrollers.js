import { CarModel } from "../models/car.js";
import { validateCar, validatePartialCar } from '../schemas/carScehmas.js';


export class CarCrontoller {
  // GET ALL AND GET BY BRAND
  static async getAll(req, res) {
    const { brand } = req.query;
    const cars = await CarModel.getAll({ brand });

    if (cars.length === 0) {
      res.status(400).json({ message: 'Brand not Found' })
    }
    res.json(cars)
  }

  // GET BY ID
  static async getById(req, res) {
    const { id } = req.params;
    const carById = await CarModel.getById({ id });
    if (carById) return res.json(carById);
    res.status(400).json({ message: 'Car not found' })

  }

  // POST 
  static async create(req, res) {
    const result = validateCar(req.body);

    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newCar = await CarModel.create(result.data)

    res.status(201).json(newCar)
  }

  // PATCH
  static async update(req, res) {
    const result = validatePartialCar(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params;
    const updateCar = await CarModel.update({ id, input: result.data })

    return res.json(updateCar)
  }

  // DELETE
  static async delete(req, res) {
    const { id } = req.params;
    const deleteCar = await CarModel.delete({ id })
    if (deleteCar === -1) {
      return res.status(401).json({ message: 'Car not found' })
    }
    return res.json({ message: 'Car delete' })
  }
}
