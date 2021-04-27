import jwt from 'jsonwebtoken'

export const verifyUser = req => {
  try {
    req.email = null
    const bearerHeader = req.headers.authorization
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1]
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET_KEY || 'mysecretkey'
      )
      //@ts-ignore
      req.email = payload.email
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}
