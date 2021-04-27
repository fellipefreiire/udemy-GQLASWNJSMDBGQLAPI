import jwt from 'jsonwebtoken'
import User from '../database/models/user'

interface TokenInterface {
  email: string
}

export const verifyUser = async req => {
  try {
    req.email = null
    req.loggedInUserId = null
    const bearerHeader = req.headers.authorization
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1]
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || 'mysecretkey'
      )

      req.email = (payload as TokenInterface).email
      const user = await User.findOne({
        email: (payload as TokenInterface).email
      })
      req.loggedInUserId = user.id
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}
