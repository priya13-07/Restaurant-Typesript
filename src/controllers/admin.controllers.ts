import { Request, Response } from 'express';
import { Restaurant } from '../schemas/restaurant.schemas';
import { Dish } from '../schemas/dishes.schemas';

export default {
  // Create a new restaurant
  createRestaurant: async (req: Request, res: Response) => {

    const _restaurantBody = req.body; 
    const errors = new Array()
    if (!_restaurantBody.name || typeof _restaurantBody.name != 'string') {
        errors.push("Name is either not present or is not type String")
    }
    if(errors.length > 0) {
        return res.status(400).json({
            data: errors,
            message: 'Restaurant not created, Validation error.'
        })
    }
    
    const _restaurant = new Restaurant(_restaurantBody)
    return _restaurant.save().then(result => {
        res.status(200).json({data: result})
    }).catch(err => {
        res.status(500).json({data: err})
    })
  },

  // Update a restaurant
  updateRestaurant: async (req: Request, res: Response) => {

    try {
        const { restaurantId } = req.params;
        // Update restaurant details
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, req.body, { new: true });

        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        // Adding multiple dishes to the restaurant
        const { dish } = req.body;

        if (dish && Array.isArray(dish)) {
            const dishPromises = dish.map(async dish_id => {
                const dish = await Dish.findById(dish_id);
                if (dish) {
                    updatedRestaurant.dishes.push(dish);
                }
            });

            await Promise.all(dishPromises);
            await updatedRestaurant.save();
        }

        res.status(200).json({ data: updatedRestaurant });
    } catch (err) {
        res.status(500).json({ data: err });
    }
  },

  // Delete a restaurant
  deleteRestaurant: async (req: Request, res: Response) => {
    const { restaurantId } = req.params;
    try {
      const deletedRestaurant = await Restaurant.findByIdAndDelete(restaurantId);
      res.status(204).json({data:deletedRestaurant, message: 'Restaurant deleted' });
    } catch (error : any) {
      res.status(500).json({ message: 'Error deleting restaurant', error: error.message });
    }
  },

  // Create a new dish
  createDish: async (req: Request, res: Response) => {
    try {
      const newDish = await Dish.create(req.body);
      res.status(201).json(newDish);
    } catch (error : any) {
      res.status(500).json({ message: 'Error creating dish', error: error.message });
    }
    
  },

  // Update a dish
  updateDish: async (req: Request, res: Response) => {
    const { dishId } = req.params;
    try {
      const updatedDish = await Dish.findByIdAndUpdate(dishId, req.body, { new: true });
      res.status(200).json(updatedDish);
    } catch (error: any) {
      res.status(500).json({ message: 'Error updating dish', error: error.message });
    }
  },

  // Delete a dish
  deleteDish: async (req: Request, res: Response) => {
    const { dishId } = req.params;
    try {
      await Dish.findByIdAndDelete(dishId);
      res.status(204).json({ message: 'Dish deleted' });
    } catch (error : any) {
      res.status(500).json({ message: 'Error deleting dish', error: error.message });
    }
  },
};
