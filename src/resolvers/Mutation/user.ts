import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../../database/models/user'

type LoginInput = {
  input: {
    email: String
    password: String
  }
}

type SignupInput = {
  input: {
    name: String
    email: String
    password: String
  }
}

export default {
  signup: async (_: any, { input }: SignupInput) => {
    try {
      const user = await User.findOne({ email: input.email })
      if (user) {
        throw new Error('Email already in use')
      }

      const hashedPassword = await bcrypt.hash(input.password, 12)

      const newUser = new User({ ...input, password: hashedPassword })
      const result = await newUser.save()

      return result
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  login: async (_: any, { input: { email, password } }: LoginInput) => {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error('User not found')
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        throw new Error('Invalid User/Password')
      }

      const secret = process.env.JWT_SECRET_KEY || 'mysecretkey'
      const token = jwt.sign({ email: user.email }, secret, { expiresIn: '1d' })

      return { token }
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}
