/* eslint-disable require-jsdoc */
import mongoose from "mongoose";
import { ObjectId, MongoClient, ServerApiVersion } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "./user.js";
import CustomerModel from "./customer.js";
import TransactionModel from "./transaction.js";
import { generateAccessToken } from "./auth.js"
import AccountModel from "./account.js";
import dotenv from "dotenv";
dotenv.config();

mongoose.set("debug", true);
// const connectionString = `mongodb://localhost:27017/mongo`;
const uri = process.env.MONGODB_URI_STRING;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});

//add user - hash password - save model to DB - generateToken
async function addUser(name, email, password, permissions) {
  const hash = await (bcrypt
  .genSalt(10)
  .then((salt) => bcrypt.hash(password, salt)));
  const user = {
    name: name,
    email: email,
    password: hash,
    permissions: permissions,
  }

  const userToAdd = new UserModel(user);
  const promise = await userToAdd.save();
  const token = await generateAccessToken(email);
  return {promise, token};
}

async function getUsers() {
  let promise;
  promise = await UserModel.find();
  return promise;
}

async function getUserByEmail(email) {
  try {
    console.log(email)
    const user = await UserModel.findOne({email});
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

async function addCustomer(name, job) {
  const customer = {
    name: name,
    job: job,
  }
  const customerToAdd = new CustomerModel(customer);
  const promise = await customerToAdd.save();
  return promise;
}

async function addTransaction(amount, category, date, description) {
  const transaction = {
    amount: amount,
    category: category,
    date: date,
    description: description,
  }
  const transactionToAdd = new TransactionModel(transaction);
  const promise = await transactionToAdd.save();
  return promise;
}

export default {
  addUser,
  getUsers,
  addCustomer,
  addTransaction,
  getUserByEmail,
  
};
