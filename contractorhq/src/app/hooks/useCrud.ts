/* eslint-disable @typescript-eslint/no-explicit-any */
import { Model, Document } from "mongoose";

// Define the type for the Model and generic Data type.
export const useCrud = <T extends Document>(model: Model<T>) => {
  // Create
  const create = async (data: T): Promise<T> => {
    try {
      const result = await model.create(data);
      return result;
    } catch (err: any) {
      throw new Error(`Error creating document: ${err.message}`);
    }
  };

  // Read (get all)
  const getAll = async (): Promise<T[]> => {
    try {
      const result = await model.find({});
      return result;
    } catch (err: any) {
      throw new Error(`Error fetching documents: ${err.message}`);
    }
  };

  // Read (get by ID)
  const getById = async (id: string): Promise<T | null> => {
    try {
      const result = await model.findById(id);
      return result;
    } catch (err: any) {
      throw new Error(`Error fetching document by ID: ${err.message}`);
    }
  };

  // Update
  const update = async (id: string, data: Partial<T>): Promise<T | null> => {
    try {
      const result = await model.findByIdAndUpdate(id, data, { new: true });
      return result;
    } catch (err: any) {
      throw new Error(`Error updating document: ${err.message}`);
    }
  };

  // Delete
  const remove = async (id: string): Promise<T | null> => {
    try {
      const result = await model.findByIdAndDelete(id);
      return result;
    } catch (err: any) {
      throw new Error(`Error deleting document: ${err.message}`);
    }
  };

  return { create, getAll, getById, update, remove };
};
