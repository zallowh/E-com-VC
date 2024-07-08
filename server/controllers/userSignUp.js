const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

async function userSignUpController(req, res) {
    try {
        const { email, password, username, profilepic } = req.body;

        const user = await userModel.findOne({email})
        if(user){
            throw new Error("User already registered. login or try another email")
        }

        if (!email) {
            throw new Error("Please type email");
        }
        if (!password) {
            throw new Error("Please type password");
        }
        if (!username) {
            throw new Error("Please type username");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Check if password hashing was successful
        if (!hashPassword) {
            throw new Error("Something went wrong during password hashing");
        }

        const payload = {
            ...req.body,
            role : "GENERAL",
            password: hashPassword,
            profilepic
        };

        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully!"
        });
    } catch (err) {
        res.json({
            message: err.message || err ,
            error: true,
            success: false
        });
    }
}

module.exports = userSignUpController;
