import { Sale } from "../models/saleModel.js";
import { Product } from "../models/productModel.js";
import dayjs from "dayjs";
import mongoose from "mongoose";

export const getSales = async (req, res) => {
  Date.prototype.setToWarsawTime = function () {
    this.setTime(this.getTime() + 2 * 60 * 60 * 1000);

    this.setUTCHours(21, 59, 59, 999);
  };

  const user_id = new mongoose.Types.ObjectId(req.user.id);
  const { start, end } = req.query;
  const startDate = new Date(start);
  let endDate = new Date(end);
  endDate.setToWarsawTime();
  startDate;

  try {
    const salesByDate = await Sale.find({
      user_id,
      createdAt: { $gte: startDate, $lte: endDate },
    }).sort({
      createdAt: -1,
    });
    console.log(salesByDate.length);
    res.status(200).json({ sales: salesByDate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSalesOfProduct = async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;

  try {
    const sale = await Sale.find({ user_id, product_id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ sale });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const postSale = async (req, res) => {
  const user_id = req.user.id;

  const { product_id, EAN, quantity, store } = req.body;
  console.log(req.body);

  try {
    let product = await Product.findOne({ user_id, product_id });
    const productQuantity = product.quantity;

    if (quantity > productQuantity) {
      return res.status(400).json({ message: "Not enough products in store." });
    }

    const saleData = await Sale.create({
      product_id,
      EAN: parseInt(EAN, 10),
      quantity: parseInt(quantity, 10),
      store,
      user_id,
    });

    const productSalesArray = product.sales;
    const saleID = saleData._id;

    await Product.updateOne(
      { user_id, product_id },
      {
        $set: {
          quantity: productQuantity - quantity,
          sales: [...productSalesArray, saleID],
        },
      }
    );

    product = await Product.findOne({ user_id, product_id });
    const products = await Product.find({ user_id });
    const sales = await Sale.find({ user_id });

    return res.status(200).json({ products, sales, product });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error.message });
  }
};
