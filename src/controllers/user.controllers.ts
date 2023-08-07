import { Request, Response } from 'express';
import { Restaurant } from '../schemas/restaurant.schemas';
import { Dish } from '../schemas/dishes.schemas';

export default {
  // Search for restaurants
  searchRestaurants: async (req: Request, res: Response) => {

    const restaurants = await Restaurant.find({}).populate("dishes").then(result => {
        return res.status(201).json({data: result})

    }).catch(err => {
        return res.status(500).json({data: err})
    })
  },

  // Search for dishes
  searchDishes: async (req: Request, res: Response) => {
    try {
      const dishes = await Dish.find(req.query);
      res.status(200).json(dishes);
    } catch (error:any) {
      res.status(500).json({ message: 'Error searching dishes', error: error.message });
    }
  },
};
