var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var logger = require("morgan");
var passport = require('passport');
var bearer =require('./strategies/bearer.js')

// const initializePassport = require('./passport-config');
// initializePassport(passport);

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var bookRouter = require("./routes/book");
var bookTitleRouter = require("./routes/bookTitle");
var authorRouter = require("./routes/author");// autenticate
var authorBookTitleRouter = require("./routes/authorBookTitle");
var loginRouter = require("./routes/login");

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
// app.use(passport.session());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/book", bookRouter);
app.use("/bookTitle", bookTitleRouter);
app.use("/author", authorRouter);// autenticate
app.use("/authorBookTitle", authorBookTitleRouter);
app.use("/login", loginRouter);
// app.use("/registration", registrationRouter);лишнее

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

module.exports = app;
