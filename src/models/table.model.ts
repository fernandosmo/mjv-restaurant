import { Schema, model } from "mongoose"

export interface ITable {
  code: number
  seats: number
  occupied: boolean
  startServiceDate?: Date | null
  endServiceDate?: Date | null
  orderItems?: string[] | null
  bill?: number | null
  paid: boolean | null
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export const tableSchema = new Schema({
  code: {
    type: Number,
    unique: true,
    require: true
  },
  seats: {
    type: Number,
    require: true
  },
  occupied: {
    type: Boolean,
    default: false
  },
  startServiceDate: {
    type: Date
  },
  endServiceDate: {
    type: Date
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
    default: 0
  },
  paid: {
    type: Boolean
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
})

export const Table = model('Table', tableSchema)