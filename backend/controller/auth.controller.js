require('dotenv').config()
const userSchema = require('../model/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req , res) => {
    const {name , email , password} = req.body;
    try {
        await bcrypt.hash(password , 10)
        .then(async (hashPassword) => {
            const result = await userSchema.create({
                name : name,
                email : email,
                password : hashPassword
            })
            
            if(result){            
                res.status(200).json({
                    msg : "Account in successfully created!"
                })
            }    
        }).catch(err => res.status(404).json({msg : 'Failed to create account!'}))

    } catch (error) {
        res.status(400).json({
            msg : "something is wrong check the password and email!"
        })
    }
}

const signIn = async (req , res) => {
    const {email , password} = req.body;
    try {
        const result = await userSchema.findOne({email : email})
        if(result.email){
            await bcrypt.compare(password , result.password , (err , check) => {
                if(err) return res.status(404).json({msg : "invalid password!"})
                if(check) {
                    jwt.sign({result} , process.env.JWT_key , (err , token) => {
                        if(err) {
                            return res.status(401).json({msg : "Failed to Login. "})
                        }
                        return res.status(201).json({
                            auth : token,
                            msg : "Welcome to File.Store",
                            user : result
                        })
                    })
                }
            })
        }
    } catch (error) {
        return res.status(404).json({msg : "This email is not available"})
    }
}

module.exports = {
    signUp,
    signIn
}