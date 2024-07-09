const express = require('express');
const userSignUpController = require("../controllers/userSignUp");
const userSignInController = require('../controllers/userSignIn');
const userDetailsController = require('../controllers/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controllers/userLogout');

const router = express.Router();

router.post("/signup", userSignUpController);
router.post("/login", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);


module.exports = router;
