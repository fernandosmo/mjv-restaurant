import { Schema, model } from "mongoose";

export interface IWine {
  item: string;
  price: number;
  createdAt: Date;
  updatedAt?: Date | null;
  deletedAt?: Date | null;
}

export const wineSchema = new Schema({
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

export const Wine = model('Wine', wineSchema);