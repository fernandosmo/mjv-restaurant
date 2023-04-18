import { Schema, model } from "mongoose";

export interface ISequencyEmployerCode {
  seq: number
}

export const counterSchema = new Schema({
  seq: { type: Number },
});

export const SequencyEmployerCode = model('SequencyEmployerCode', counterSchema);