import User from "../models/User"

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)

        // get all the friends by asking for every id what user is it
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

        // format the friends collection that it matches only the data needed
        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                occupation,
                location,
                picturePath,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    occupation,
                    location,
                    picturePath,
                }
            }
        )
        // return them
        res.status(200).json(formattedFriends)
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}
