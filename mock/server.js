var express = require("express")
var app = express();

var router = express.Router();

app.get('/', function(req, res) {
    res.send('hello world');
});

router.use("/test",require('./mock'));


app.use("/api",router)


app.listen(3000)