import { Schema, model } from "mongoose";

export interface IDessert {
  item: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export const dessertSchema = new Schema({
  item: { 
    type: String ,
    require: true
  },
  price: { 
    type: Number ,
    require: true
  }, 
  createdAt: {
    type: Date,
    default: new Date()
  },
  updatedAt: {
    type: Date,
  },
  deletedAt: {
    type: Date,
  },
});

export const Dessert = model('Dessert', dessertSchema);