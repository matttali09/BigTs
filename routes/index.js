const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");


// API Routes
router.use("/api", apiRoutes);

// If no API routes are hit, send the React app
router.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../bigts/build/')});
});

module.exports = router;