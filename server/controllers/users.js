import User from "../models/User.js"

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

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params

        const userId = id
        const user = await User.findById(userId)
        const friend = await User.findById(friendId)

        // if the friendID is actually a friend of the User, than remove it, else add them
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId)
            friend.friends = friend.friends.filter((id) => id !== userId)
        } else {
            user.friends.push(friendId)
            friend.friends.push(userId)
        }

        await user.save()
        await friend.save()

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        )

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

        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ message: err.message })
    }
}
