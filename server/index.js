const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const port = 5000;
const config = require("./config/key");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


//noejs 새로설치후 몽고DB접속  오류시  localhost ->0.0.0.0
console.log("config.mongoURI  : ", config.mongoURI);
app.use(session({
    secret: '12312dajfj23rj2po4$#%@#',
    resave: false,
    saveUninitialized: true,
    store: new MongoDBStore({
        uri: 'mongodb://0.0.0.0:27017/react_boiler_plate',
        collection: 'sessionStore'
    })
}));
mongoose.connect(config.mongoURI,
).then(() => console.log("MongoDB Connected...")).catch(err => console.error("에러 :", err));



app.use("/api/users", require("./routes/users"));

app.get('/', (req, res) => {
    res.send("Hello World!");
})


app.listen(port, () => {
    console.log(`node and react project port ${port}`);
});
