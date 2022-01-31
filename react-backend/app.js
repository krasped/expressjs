var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bookRouter = require("./routes/book");
var bookTitleRouter = require("./routes/bookTitle");
var loginRouter = require("./routes/login");
var registrationRouter = require("./routes/registration");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/book", bookRouter);
app.use("/bookTitle", bookTitleRouter);
app.use("/login", loginRouter);
app.use("/registration", registrationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

module.exports = app;
