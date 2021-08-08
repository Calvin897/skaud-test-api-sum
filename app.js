var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(express.json());

// app.get("/api/add", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       add: 1 + 1
//     }
//   });
// });

app.post("/api/add", (req, res) => {
  const num1 = req.body.number1;
  const num2 = req.body.number2;
  const sumTotal = num1 + num2;

  res.status(200).json({
    sum: sumTotal
  });
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// app.get("/api/v1/add", (req, res) => {
//   res.status(200).json({ message: "hello from the server " });
// });

module.exports = app;
