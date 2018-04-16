import jwt from 'jsonwebtoken';


export function generateToken() {
    const cred = true;

    const cert = process.env.SECRET_KEY;
    if (cred) {
        return jwt.sign({ foo: 'bar' }, cert);
    }
}


export function verifyToken(req, res, next) {
    console.log('verifyToken');
    next();
}

