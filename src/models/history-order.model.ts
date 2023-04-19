import { Schema, model } from "mongoose"

export interface IHistoryOrder {
  startServiceDate?: Date | null
  endServiceDate?: Date | null
  orderItems?: string[] | null
  bill?: number | null
  paid: boolean | null
  createdAt: Date
}

export const historyOrderSchema = new Schema({
  startServiceDate: {
    type: Date,
    require: true
  },
  endServiceDate: {
    type: Date,
    require: true
  },
  orderItems: [
    {
    itemId: String,
    quantity: Number,
    deletedAt: Date,
    },
  ], 
  bill: {
    type: Number,
    require: true
  },
  paid: {
    type: Boolean,
    require: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
})

export const HistoryOrder = model('HistoryOrder', historyOrderSchema)