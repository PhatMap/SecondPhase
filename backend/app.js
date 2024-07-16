const express = require("express");
const app = express();
const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const errorMiddlewares = require("./middlewares/errors");

dotenv.config({ path: "backend/config/config.env" });

// Middleware setup
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: "dfbo1ecn9",
  api_key: "937221934331221",
  api_secret: "0PalAWB6WXyk7srvsbPxNosjvp0",
});

io.on("connection", (socket) => {
  console.log("A client connected");
});


// Routes
const products = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
const payment = require("./routes/payment");
const cart = require("./routes/cart");
const category = require("./routes/category");

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use("/api/v1", payment);
app.use("/api/v1", cart);
app.use("/api/v1", category);
// Error middleware
app.use(errorMiddlewares);

module.exports = { app, server, io };
