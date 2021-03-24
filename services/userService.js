const UserModel = require('../repositories/model/usersModel')
const tokenUtils = require('../utils/tokenUtils')

class UserService {

    async isUsernameExist(username) {
        console.debug('UserService:isUsernameExist: Checking for username ', { username })
        const isExists = await UserModel.find({ email: username, markDelete: false }).countDocuments()
        console.log('UserService:isUsernameExist: ', { isExists })
        return isExists
    }

    async add(data, currentUser) {
        console.debug('UserService:add: Adding new user ', {})
        if (await this.isUsernameExist(data.email)) {
            throw new Error('Username is taken')
        }
        const user = new UserModel(data)
        const res = await (await user.save()).toObject()
        delete res.password
        console.log('UserService:add: User added ')
        return res
    }

    async verifyCredentials(data) {
        console.debug('UserService:verifyCredentials: Verifying credentials ')
        const user = await UserModel.findOne({ email: new RegExp('^' + data.username + '$', 'i'), markDelete: false })
        if (user) {
            const isMatch = await user.comparePassword(data.password, user.password)
            console.debug('UserService:verifyCredentials: ', { isMatch })
            if (isMatch) {
                // valid username and password
                return user
            } else {
                throw new Error('Invalid credentials')
            }
        } else {
            throw new Error('User not found')
        }
    }

    async login(user) {
        let data = await this.verifyCredentials(user)
        data = {
            _id: data._id,
            username: data.username
        }
        const token = await tokenUtils.generate(data)
        return { data, token }
    }
}

module.exports = new UserService()