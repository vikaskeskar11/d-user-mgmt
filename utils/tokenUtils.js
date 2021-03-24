const jwt = require('jsonwebtoken')
const config = require('config')

class TokenUtils {
    async generate(user) {
        const token = jwt.sign({ userId: user._id, username: user.username, role: user.role }, config.JWT_TOKEN_KEY)
        return token
    }

    async verify(token) {
        if (!token) {
            throw new Error('error.tokenNotFound')
        }
        const decoded = await jwt.verify(token, config.JWT_TOKEN_KEY)
        return decoded
    }
}

module.exports = new TokenUtils()