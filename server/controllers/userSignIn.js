const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function userSignInController(req,res){
    try{
        const {email, password} = req.body
        
        if (!email) {
            throw new Error("email not found");
        }
        if (!password) {
            throw new Error("incorrect password");
        }

        const user = await userModel.findOne({email})
        
        if(!user){
            throw new Error("user not found, please signUp or correct your email address")
        }
        const checkPassword = await bcrypt.compare(password,user.password)
        if(checkPassword){
            const tokenData = {
                _id: user.id,
                email : user.email,
            }
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });
            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token",token,tokenOption).json({
                message : "Login successfully",
                data : token,
                success : true,
                error : false
            })
        }else{
            throw new Error("incorrect password")
        }

    }catch(err){
        res.json({
            message: err.message || err ,
            error: true,
            success: false
         })
    }
}

module.exports = userSignInController