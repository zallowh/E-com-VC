const express = require('express');
const userSignUpController = require("../controllers/userSignUp");
const userSignInController = require('../controllers/userSignIn');
const userDetailsController = require('../controllers/userDetails');
const authToken = require('../middleware/authToken');

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", userSignInController);
router.get("/user-details", authToken, userDetailsController);



module.exports = router;
