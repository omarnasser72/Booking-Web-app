import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import reservationsRoute from "./routes/reservations.js";
import rateRoute from "./routes/hotelRates.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to database");
  } catch (error) {
    throw error;
  }
};

//MIDDLEWARES
app.use(cors());
app.use(cookieParser());
//to send json to express we have to use it's middleware
app.use(express.json());

app.use("/auth", authRoute); //  when we call in web app this  "/auth" we go to the authRoute and see the matched api with it
app.use("/hotels", hotelsRoute);
app.use("/users", usersRoute);
app.use("/rooms", roomsRoute);
app.use("/reservations", reservationsRoute);
app.use("/rates", rateRoute);

//error handler
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong";

  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
  });
});

app.listen(8888, () => {
  connect();
  console.log("connected with backend ..... ");
});
