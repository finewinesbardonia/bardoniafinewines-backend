require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');

const productRouter = require("./routes/product.router")
const customerRouter = require("./routes/customer.router");
const storeRouter = require("./routes/store.router");
const brandRouter = require("./routes/brand.router");
const orderRouter = require("./routes/order.router");

require("./database/index");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the 'public' directory
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.send("Welcome to the Wine Store");
});

app.use("/api/customer", customerRouter);
app.use("/api/product",productRouter);
app.use("/api/store",storeRouter);
app.use("/api/brand",brandRouter);
app.use("/api/order",orderRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));


