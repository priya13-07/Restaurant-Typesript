import { Schema, model, Document } from 'mongoose';
import { IDish } from './dishes.schemas';
const validator = require("validator");

export interface IRestaurant extends Document {
  name: string;
  address: string;
  phone: number;
  title: string;
  subtitle: string;
  availability: string;
  dishes: IDish[];
}

const restaurantSchema = new Schema<IRestaurant>({
  name: {
    type: String,
    required: [true, 'Name is required.'],
    trim: true,
    minLength: 5,
    maxLength: 150,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    validate: [validator.isMobilePhone, "Please enter a  valid phone number."],
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  dishes: [{
    type: Schema.Types.ObjectId,
    ref: 'Dish', // Reference to the associated dish model
  }],
}, {
  timestamps: true,
  versionKey: false,
});

export const Restaurant = model<IRestaurant>('Restaurant', restaurantSchema);
