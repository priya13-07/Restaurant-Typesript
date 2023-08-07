import { Schema, model, Document } from 'mongoose';

export interface IDish extends Document {
  name: string;
  description: string;
  veg_nonveg: boolean;
  ingredients: string[];
}

const dishSchema = new Schema<IDish>({
  name: {
    type: String,
    required: [true, 'Dish name is required.'],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  veg_nonveg: {
    type: Boolean,
    required: false,
    unique : false
  },
  ingredients: [String],
}, {
  timestamps: true,
  versionKey: false,
});

export const Dish = model<IDish>('Dish', dishSchema);
