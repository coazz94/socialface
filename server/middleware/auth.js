import jwt from "jsonwebtoken"

export const verifyToken = async (req, res, next) => {
    try {
        // grab the token from the req header
        let token = req.header("Authorization")

        // if no token return status
        if (!token) return res.status(403).send("Access Denied")

        // token cleanup, grab it
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft()
        }
        // verify the user
        const verified = jwt.verify(token, process.env.JWT_SECRET)
        // set the user as verified
        req.user = verified
        // continue
        next()
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
