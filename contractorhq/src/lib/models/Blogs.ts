import { Schema, model, Document, models } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: string;
  author: string;
  publishedDate: Date;
  category: string;
  image?: string;
  isPublished: boolean;
  slug: string;
}

// Check if the model already exists to prevent overwriting
const BlogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    category: { type: String, required: true },
    image: { type: String }, 
    isPublished: { type: Boolean, default: true },
    slug: { type: String, required: true, unique: true },
  },
  { timestamps: true } // Automatically handle createdAt and updatedAt
);

export const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);
