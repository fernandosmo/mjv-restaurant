import { Schema, model } from "mongoose";

export interface ITableCode {
  seq: number
}

export const counterSchema = new Schema({
  seq: { type: Number, required: true },
});

export const SequencyTableCode = model('TableCode', counterSchema);