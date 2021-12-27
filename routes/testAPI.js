const express = require("express");
const router = express.Router();

router.get("/", function(req, res, next) {
    res.send("Status: Working just fine");
});

module.exports = router;