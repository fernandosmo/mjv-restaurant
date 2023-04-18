import { Schema, model } from "mongoose";

export interface ISalad {
  item: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export const saladSchema = new Schema({
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

export const Salad = model('Salad', saladSchema);