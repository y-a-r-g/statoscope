var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    errorHandler = require("errorhandler"),
    methodOverride = require("method-override"),
    hostname = process.env.HOSTNAME || "0.0.0.0",
    port = parseInt(process.env.PORT, 10) || 80;

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + "/frontend/public"));
app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

console.log("Server is listening at port " + port);
app.listen(port, hostname);
