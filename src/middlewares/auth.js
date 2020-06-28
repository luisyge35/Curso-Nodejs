const jwt = require('jsonwebtoken');

const isvalidHostname = (req, res, next) => {
    const validHosts = ['localhost', 'dominio'];
    if(validHosts.includes(req.hostname)){
        next();
    } else {
        res.status(401).send({status: 'ERROR', message: 'ACCESS_DENIED'});
    }
}

const isAuth = (req, res, next) => {
    console.log('req.headers', req.headers);
    const { token } = req.headers;
    if (token){
        try {
            jwt.verify(token,process.env.JWT_SECRET);
            next();
        } catch (error) {
            res.status(500).send({status: 'ERROR', message: error.message});
        }
    } else {
        res.status(402).send({status: 'ERROR', message: 'Missing token'});
    }   
}


module.exports = {isAuth, isvalidHostname};