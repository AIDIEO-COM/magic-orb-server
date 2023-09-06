const { createToken } = require("../../helpers/jwtHelpers");
const User = require("../../models/User.Model")

const createUserService = async (user)=>{

    const createdUser = await User.create(user);
    if(!createdUser){
        throw new Error("User not created")
    }
    return createdUser;

}

const loginUserService = async (loginData)=>{
    const {email,password} = loginData;

    const user = await User.isUserExist(email);

    if(!user){
        throw new Error("User not found")
    }

    const isMatch = await User.isPasswordMatched(password,user.password);

    if(!isMatch){
        throw new Error("Invalid credentials")
    }

    // generate token
    const token =  createToken(user);


    return {
        user:{
            _id:user._id,
            id:user._id,
            email:user.email,
            role:user.role
        },
        token
    };
}

module.exports.AuthService = {
    createUserService,
    loginUserService
}