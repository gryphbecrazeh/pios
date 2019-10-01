const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const app = express();

// Express Parse Middleware
app.use(express.json());

// DB CONFIRG
const db = config.get("mongoURI");

// Connect to Mongo

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB Connected..."))
	.catch(err => console.log(err));

// Use Routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/payments", require("./routes/api/payments"));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/notes", require("./routes/api/notes"));
app.use("/api/claims", require("./routes/api/claims"));
app.use("/api/orderedSkus", require("./routes/api/orderedSkus"));
app.use("/api/shipments", require("./routes/api/shipments"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Sever started on port ${port}`));
