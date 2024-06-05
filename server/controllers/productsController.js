import mongoose from "mongoose";
import sharp from "sharp";
import { Product } from "../models/productModel.js";

export const getProducts = async (req, res) => {
  const user_id = req.user.id;
  try {
    const products = await Product.find({ user_id });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getFilterProducts = async (req, res) => {
  const user_id = req.user.id;
  const params = req.query;

  try {
    //filter
    const products = await Product.find({ user_id });
    const filterProducts = products.filter((product) => {
      const nameCondition =
        !params.name ||
        product.name.toLowerCase().includes(params.name.toLowerCase());

      const idCondition =
        !params.product_id || product.product_id.includes(params.product_id);

      const categoryCondition =
        !params.category || product.category === params.category;

      return nameCondition && idCondition && categoryCondition;
    });

    //res
    res.status(200).json(filterProducts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getProduct = async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;
  try {
    const product = await Product.findOne({ user_id, product_id });
    console.log(product);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, description, quantity, category, details, product_id, EAN } =
    req.body;
  const user_id = req.user._id;

  // image format
  const formattedImage = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("webp")
    .toBuffer();
  const imageURL = `data:image/webp;base64,${formattedImage.toString(
    "base64"
  )}`;

  try {
    // userID from authMiddleware

    const existingProduct = await Product.findOne({ user_id, product_id });

    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "You already have product with this ID." });
    }
    const product = await Product.create({
      name,
      description,
      quantity,
      image: imageURL,
      user_id,
      product_id,
      sales: [],
      category,
      details: JSON.parse(details),
      EAN,
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const updateProduct = async (req, res) => {
  const { product_id, name, quantity, category, image, EAN, details } =
    req.body;

  const updatedData = {
    product_id,
    name,
    quantity,
    category,
    EAN: "",
    details: JSON.parse(details),
  };

  const user_id = req.user._id;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { user_id, product_id },
      { $set: updatedData },
      { new: true, runValidators: true }
    );
    const products = await Product.find({ user_id });

    res.status(200).json({ updatedProduct, products });
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.params.id;

  try {
    await Product.deleteOne({ user_id, product_id });
    const products = await Product.find({ user_id });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
