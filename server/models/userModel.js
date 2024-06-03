import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

// create schema from mongoose
const Schema = mongoose.Schema;

// Create a store info Schema
;

// create user Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
  },
});

// Static login function
userSchema.statics.login = async function (email, password) {
  // check inputs
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  // Validate email
  if (!validator.isEmail(email)) {
    throw Error("Invalid email.");
  }
  // Check user exists
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User not found.");
  }
  // Match password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Invalid password");
  }
  return user;
};

// Static signup function
userSchema.statics.signup = async function (email, password) {
  // check inputs
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  // Validate email
  if (!validator.isEmail(email)) {
    throw Error("Invalid email.");
  }
  // Validate password
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong.");
  }

  // -------------------------------------------
  // Other validate
  if (!validator.isEmail(email)) {
    throw Error("Invalid email");
  }
  // -------------------------------------------

  // check already exists email
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use.");
  }

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // set user in DB
  const user = await this.create({
    email,
    password: hash,
    complete: false,
  });
  return user;
};

export const User = mongoose.model("User", userSchema);
