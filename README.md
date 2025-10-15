# GUIDE API REST CARS 📖

## This api rest was made with React:
  - ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
  - ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
  - ![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

## GET:  get all cars 🚗🚘🚙

```js
fetch('https://api-rest-cars-zwl7.onrender.com/cars')
.then(res => res.json())
.then(json => console.log(json))
```

👇Output

```js
{
  "id": "dcdd0fad-a94c-4810-8acc-5f108d3b18c3",
  "model": "Civic 2022",
  "brand": "Honda",
  "image": "https://images.hgmsites.net/hug/2022-honda-civic-sdn_100810827_h.jpg",
  "price": 27217,
  "rating": 4.7
},
```

## GET: get by brand ©️

```js
fetch('https://api-rest-cars-zwl7.onrender.com/cars?brand=chevrolet')
.then(res => res.json())
.then(json => console.log(json))
```
👇Output

```js
{
  "id": "13579bdf-2468-ace0-1357-9bdf2468ace0",
  "model": "Chevrolet Malibu 2024",
  "brand": "Chevrolet",
  "image": "https://di-sitebuilder-assets.s3.amazonaws.com/GMimages/gmMLP/chevrolet/Malibu/2024/hero.jpg",
  "price": 27722,
  "rating": 4.1
},
```

## GET: get by id 🚙
```js
fetch('https://api-rest-cars-zwl7.onrender.com/cars/deadbeef-cafe-babe-face-feed12345678')
.then(res => res.json())
.then(json => console.log(json))
```
👇Output

```js
{
  "id": "deadbeef-cafe-babe-face-feed12345678",
  "model": "Renault Megane RS 2019",
  "brand": "Renault",
  "image": "https://www.hdcarwallpapers.com/walls/2019_renault_megane_rs_cup_chassis-HD.jpg",
  "price": 33277,
  "rating": 4.9
}
```
## POST: Post new car 📝

```js
  fetch('https://api-rest-cars-zwl7.onrender.com/cars' , {
    method: "POST",
    headers: {
      'Content-type' : 'application/json; charset=UTF-8'
      },
      body: JSON.stringify‎({
      image: 'https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/mustang/2025/models/ford-mustang-2025-auto-deportivo-version-motor-ecoboost-premium.png',
      brand: 'Ford',
      model: 'EcoBoost Premium',
      price: 25000,
      rating: 4,
    })
  })
  .then(res => res.json())
  .then( json => console.log(json))
```
👇Output
``` js
{
 "id": "da5efdf3-fae0-429f-a682-7fd120677fe4",
 "model": "EcoBoost Premium",
 "brand": "Ford",
 "image": "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/mustang/2025/models/ford-mustang-2025-auto-deportivo-version-motor-ecoboost-premium.png",
 "price": 25000,
 "rating": 4
}
```

## PUT / PATCH : edit a car 🗒️
```js
  fetch('https://api-rest-cars-zwl7.onrender.com/cars' , {
    method: "PUT" / "PATCH",
    headers: {
      'Content-type' : 'application/json; charset=UTF-8'
      },
      body: JSON.stringify‎({
      image: 'https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/mustang/2025/models/ford-mustang-2025-auto-deportivo-version-motor-ecoboost-premium.png',
      brand: 'Ford',
      model: 'EcoBoost Premium',
      price: 30000,
      rating: 5,
    })
  })
  .then(res => res.json())
  .then( json => console.log(json))
```

👇Output
``` js
{
 "id": "da5efdf3-fae0-429f-a682-7fd120677fe4",
 "model": "EcoBoost Premium",
 "brand": "Ford",
 "image": "https://www.ford.mx/content/dam/Ford/website-assets/latam/mx/nameplate/mustang/2025/models/ford-mustang-2025-auto-deportivo-version-motor-ecoboost-premium.png",
 "price": 30000,
 "rating": 5
}
```

## DELETE: delete a car 📄

```js
    fetch(`https://api-rest-cars-zwl7.onrender.com/cars/${id}`, {
      method: 'DELETE'
    })
```




