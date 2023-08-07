import express from 'express';
import adminController from '../controllers/admin.controllers';
// import auth from '../util/auth';


const adminRouter = express.Router();


// adminRouter.use(auth);

adminRouter.post('/add-restaurant', adminController.createRestaurant);
adminRouter.put('/update-restaurant/:restaurantId', adminController.updateRestaurant);
adminRouter.delete('/delete-restaurant/:restaurantId', adminController.deleteRestaurant);

adminRouter.post('/add-dish', adminController.createDish);
adminRouter.put('/update-dish/:dishId', adminController.updateDish);
adminRouter.delete('/delete-dish/:dishId', adminController.deleteDish);

export default adminRouter;
