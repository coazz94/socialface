import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

/*  REGISTER */
// async because we access the MongoDB
export const register = async (req, res) => {
    try {
        // destructure Info send from Frontend
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body

        // salt and has the password
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 1000),
            impressions: Math.floor(Math.random() * 1000),
        })

        // save the newUser
        const savedUser = await newUser.save()

        // send the response to the Frontend
        res.status(201).json(savedUser)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        // destruct the info from the request
        const { email, password } = req.body
        // get the User from the DB
        const user = await User.findOne({ email: email })
        // if No user response with error
        if (!user) return res.status(400).json({ msg: "User dose not exist" })

        // compare if the passwords match
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ msg: "Invalid Password" })

        // get the token from JWT, pass the id and the JWT Secret in the .env FILE
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        // delete the user password from the user const (so that it is not send to the frontend)
        delete user.password

        // return response, with token and the userdata
        res.status(200).json({ token, user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
