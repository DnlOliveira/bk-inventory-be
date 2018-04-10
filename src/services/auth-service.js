import jwt from 'jsonwebtoken';

export function generateToken() {
    const cred = true;

    //TODO: secret key should be moved to .env file
    const cert = 'mySecretKey';
    if (cred) {
        return jwt.sign({ foo: 'bar' }, cert);
    }
}

export function verifyToken(req, res, next) {
    console.log('verifyToken');
    next();
}