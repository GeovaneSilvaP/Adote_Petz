import mongoose, { Schema } from "mongoose";

export const Pets = mongoose.model(
  "Pets",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      weight: {
        type: Number,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
      available: {
        type: Boolean,
      },
      images: {
        type: [String],
        required: true,
      },
      user: Object,
      adopter: Object,
    },
    { timestamps: true },
  ),
);