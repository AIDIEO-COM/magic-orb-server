require('dotenv').config();
const httpStatus = require("http-status");
const { verifyToken } = require('../helpers/jwtHelpers');
const ApiError = require('../shared/ApiError');

// export default (...requiredRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
const auth = (...requiredRoles) => async (req, res, next) => {
    try {
        //get authorization token
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');

        // verify token
        let verifiedUser = null;

        verifiedUser = verifyToken(token, process.env.JWT_SECRET);

        req.user = verifiedUser; // role  , userid

        // role diye guard korar jnno
        if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = auth;