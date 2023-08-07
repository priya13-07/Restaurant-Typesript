import express from 'express';
import userController from '../controllers/user.controllers';

const userRouter = express.Router();

userRouter.get('/search-restaurants', userController.searchRestaurants);
userRouter.get('/search-dishes', userController.searchDishes);

export default userRouter;
