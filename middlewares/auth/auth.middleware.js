const jwt = require('jsonwebtoken');
const { model } = require('mongoose');

module.exports =async (req, res, next) => {
    try{
        const token = req.headers.authorization;

        if(!token){
            return res.status(401).json({
                status: 'invalid_token'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserActivation.findByPk(decoded.data.id)



    }
    catch(err){
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({
                message: 'Token expired'
            })
        }
        else if(err.name === 'JsonWebTokenError'){
            return res.status(401).json({
                message: 'Invalid token'
            })
        }
        else{
            return res.status(401).json({
                message: err.message
            })
        }
    }
}