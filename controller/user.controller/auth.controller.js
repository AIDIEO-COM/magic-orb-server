const httpStatus = require("http-status");
const { AuthService } = require("../../services/user.services/Auth.service");
const sendResponse = require("../../shared/sendResponse");

const createUser = async (req, res,next) => {
    try{

        const {email,password} = req.body;
        const createdUser = await AuthService.createUserService({email,password});
        
      

        sendResponse(res,httpStatus.CREATED,true,"User created successfully",createdUser)



    }catch(err){
        next(err)
    }
}

const loginUser = async (req, res,next) => {
    try{
        const {email,password} = req.body;
        const {user,token} = await AuthService.loginUserService({email,password});


        sendResponse(
            res,
            httpStatus.OK,
            true,
            "User logged in successfully",
            {
                user,
                token
            }
        )
    }
    catch(err){
        next(err)
    }
}

module.exports.AuthController = {
    createUser,
    loginUser
}