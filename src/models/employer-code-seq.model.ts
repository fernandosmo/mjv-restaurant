import { Schema, model } from "mongoose";

export interface ISequencyEmployerCode {
  seq: number
}

export const counterSchema = new Schema({
  seq: { type: Number, required: true },
});

export const SequencyEmployerCode = model('SequencyEmployerCode', counterSchema);