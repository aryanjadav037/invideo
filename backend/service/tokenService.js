import jwt from 'jsonwebtoken';

class TokenService {
    constructor(secret, expiresIn) {
        this.secret = secret;
        this.expiresIn = expiresIn;
    }

    generateToken(user) {
        return jwt.sign({ id: user.id, email: user.email }, this.secret, { expiresIn: this.expiresIn });
    }

    verifyToken(token) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            throw new Error('Invalid or expired token');
        }
    }

    invalidateToken(user) {
        // Implementation depends on how token invalidation is handled (e.g., blacklist)
        return true;
    }
}

export default TokenService;
