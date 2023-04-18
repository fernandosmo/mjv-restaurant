import { Schema, model } from "mongoose";

export interface IUser {
  role: number
  name: string
  password: string
  employerCode: number
  createdAt: Date
  updatedAt?: Date | null
  deletedAt?: Date | null
}

export const userSchema = new Schema({
  role: {
    type: Number,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: [true, 'Password name required'],
  },
  employerCode: {
    type: Number,
    require: true,
    unique: true,
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

export const User = model('Users', userSchema)