import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  transaction_type: {
    type: String,
  },
  address: {
    type: String,
  },
  wallet: {
    type: mongoose.Types.ObjectId,
    ref: "Wallet",
    required: true,
  },
});

export default mongoose.model("Transaction", transactionSchema);
