import { readJSON } from "../utils/json.js";
import { randomUUID } from 'node:crypto';

const cars = readJSON('../cars.json')

export class CarModel {
  static async getAll({ brand }) {
    if (brand) {
      // const filteredCars = cars.filter(car =>
      //   car.brand.toLocaleLowerCase() === brand.toLocaleLowerCase()
      // )
      // return res.json(filteredCars)
      return cars.filter(car =>
        car.brand.toLocaleLowerCase() === brand.toLocaleLowerCase()
      )
    }
    return cars
  }

  static async getById({ id }) {
    const carById = cars.find(car => car.id === id)
    return carById;
  }

  static async create(input) {
    const newCar = {
      id: randomUUID(),
      ...input
    }
    cars.push(newCar);
    return newCar;
  }

  static async update({ id, input }) {
    const carIndex = cars.findIndex(car => car.id === id);
    if (carIndex === -1) res.status(400).json({ message: 'Car not found' })
    const updateCar = {
      ...cars[carIndex],
      ...input,
    }

    return cars[carIndex] = updateCar

  }

  static async delete({ id }) {
    const deleteCar = cars.findIndex(car => car.id === id);
    if (deleteCar === -1) return false
    cars.splice(deleteCar, 1)
    return true
  }
}