const z = require('zod');

const carSchema = z.object({
  model: z.string({
    invalid_type_error: 'The Car model must be a string',
    required_error: 'The car model is required'
  }),
  brand: z.string({
    invalid_type_error: 'The Car brand must be a string',
    required_error: 'The car brand is required'
  }),
  image: z.url({
    message: 'Image must be a valid URL'
  }),
  price: z.number().int().positive(),
  rating: z.number().min(0).max(5).default(3)
})

function validateCar(object) {
  return carSchema.safeParse(object)
}


module.exports = {
  validateCar
}