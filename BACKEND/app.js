const fs = require("fs");
const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.8hpp0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(bodyParser.json());

app.use("/uploads/images", express.static(path.join("uploads", "images")));
app.use(express.static("public"));

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.originalUrl}`, req.params, req.body);
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
//   next();
// });

app.use("/api/places", placesRoutes); // =. /api/places/...
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// app.use((req, res, next) => {
//   const error = new HttpError("Could not find this route.", 400); // Bad Request
//   throw error;
// });

app.use((error, req, res, next) => {
  // middle ware funtion의 argument가 4개 주어지면 첫번째는 error 이고, express는
  // 이를 error handling middle ware로 인식한다.
  // 앞선 middle ware 에서 에러를 던지면 여기로 들어온다.
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      console.log(err);
    });
  }
  console.log("Error Handler: " + error.code, error.message);
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(url)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
