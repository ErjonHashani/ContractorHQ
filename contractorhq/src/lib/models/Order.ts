import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: [
    {
      _id: { type: String, required: true },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered"],
    default: "processing",
  },
  createdAt: { type: Date, default: Date.now },
});

// TTL index: Automatically delete orders 7 days after `createdAt`
OrderSchema.index({ createdAt: 1 }, { expireAfterSeconds: 30 });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
