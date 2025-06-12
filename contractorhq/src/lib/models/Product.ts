import { Schema, model, Document, models } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  category: string;
  brand: "Makita" | "Milwaukee" | "DeWalt" | "Bosch" | "Stihl";
  isOnSale: boolean;
  isNewArrival?: boolean;
  image: string;
  images?: string[];
  rating?: number;
}

// Check if the model already exists to prevent overwriting
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    category: { type: String, required: true },
    brand: {
      type: String,
      enum: ["DeWalt", "Milwaukee", "Makita", "Bosch", "Stihl"],
      required: true,
    },
    isOnSale: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    image: { type: String, required: true },
    images: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

// If the model is already defined, return the existing model, otherwise define it
export const Product =
  models.Product || model<IProduct>("Product", ProductSchema);
