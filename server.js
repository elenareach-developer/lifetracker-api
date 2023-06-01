"use strict"

const { PORT } = require("./config")
const express = require("express");
const cors = require("cors");
const morgan = require("morgan")
//const stroreRouter = require("./routes/storeRoute");




const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"))

// extract user from jwt token sent in authorization header
// attach credentials to res.locals.user
//app.use(security.extractUserFromJwt)

// routes
app.use("/auth", require("./routes/auth"))
//app.use("/users", usersRoutes)
app.use("/sleep", require('./routes/sleepRoutes'))
app.use("/exercise", require("./routes/exerciseRoutes"))
app.use("/nutrition", require('./routes/nutritionRoutes'))

app.use("/" , function(req, res){
    return res.status(200).json({
        ping:"pong",
    })
})
app.use((error, req, res, next)=>{
    const status = error.statur || 500;
    const message = error.message;

    return res.status(status).json({
        error: {message, status}
    });
});



app.listen(PORT, function () {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

