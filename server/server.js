const express = require("express");
const app = express();
const path = require("path");
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

/*app.get("/index.html", (req, res) => {
	res.send("/index");
});*/

let port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log("Server listening on port 3000");
})