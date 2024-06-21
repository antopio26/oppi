const dotenv = require('dotenv');
const {auth} = require("express-oauth2-jwt-bearer");
const {User} = require("../models/user.model");

// Load environment variables from .env file
dotenv.config();

const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_DOMAIN,
    tokenSigningAlg: 'RS256'
});

const userIdCheck = async (req, res, next) => {
    const auth0Id = req.auth.payload.sub;
    try {
        const user = await User.findOne({auth0Id});
        if (!user) {
            // Get user info from Auth0
            /*
            * GET {AUTH0_DOMAIN}/userinfo
            * Authorization: 'Bearer {ACCESS_TOKEN}'
            */
            // Get token from req.auth.token
            const token = req.auth.token;

            // Get user info from Auth0
            const response = await fetch(`${process.env.AUTH0_DOMAIN}/userinfo`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const userInfo = await response.json();

            // Add new user to the database
            req.user = await User.create({
                auth0Id,
                email: userInfo.email,
                name: userInfo.given_name || userInfo.name,
                surname: userInfo.family_name,
            });
        } else {
            req.user = user;
        }
        next();

    } catch (error) {
        next(error);
    }
}

const authGuard = [jwtCheck, userIdCheck];

module.exports = {
    authGuard
}

