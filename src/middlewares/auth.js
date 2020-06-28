const jwt = require('jsonwebtoken');

const isvalidHostname = (req, res, next) => {
    console.log('Isvalidhostname')
    const validHosts = ['localhost', 'dominio'];
    if(validHosts.includes(req.hostname)){
        next();
    } else {
        res.status(401).send({status: 'ERROR', message: 'ACCESS_DENIED'});
    }
}

const isAuth = (req, res, next) => {
    console.log('isauth')
    const { token } = req.headers;
    if (token){
        try {
            const data = jwt.verify(token,process.env.JWT_SECRET);
            if(data.userID !== req.body.userID && data.role !== 'admin'){
                throw{
                    code: 403,
                    status: 'ACCESS DENIED',
                    message: 'Unathorized operation'
                }
                console.log('error');
            } 
            req.sessionData = { userId : data.userId, role: data.role};
            next();
        } catch (error) {
            res.status(500).send({status: 'ERROR', message: error.message});
        }
    } else {
        res.status(402).send({status: 'ERROR', message: 'Missing token'});
    }   
}

const isAdmin = (req, res, next) => {
    console.log('isAdmin')
    try {
        const { role } = req.sessionData;
        console.log(role)
        if(role === 'admin'){
            next();
        } else {
            throw {
                code: 403,
                stauts: 'ACCESS DENIED',
                message: 'invalid role',
            }
        }
    } catch (error) {
        res.status(error.code || 500).send({status:'ERROR', message: error.message});
    }
}




module.exports = {
    isAuth,
    isvalidHostname,
    isAdmin};