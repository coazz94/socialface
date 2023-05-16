import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/post.js"
import { register } from "./controllers/auth.js"
import { verifyToken } from "./middleware/auth.js"
import { createPost } from "./controllers/posts.js"
import User from "./models/User.js"
import Post from "./models/Post.js"
import { users, posts } from "./data/index.js"

/* CONFIGURATIONS */
// because of modules we have to use these configs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(express.json())

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(morgan("tiny"))

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(cors())
// set the directory where we save the files
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/* FILE STORAGE */
// any time someone saves a file it is going to be saved in the declared folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })

/* ROUTES WITH FILES */
// register is the controller => logic from the endpoint
// upload => will take the picture from the http and save it to the setted settings above
app.post("/auth/register", upload.single("picture"), register)

app.post("/posts", verifyToken, upload.single("picture"), createPost)

/* ROUTES */
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)

// /* MONGOOSE SETUP */
// // on the Port that is in the .env file or if it is not working on 6001
const PORT = process.env.PORT || 6001
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT} connected`))

        // inject the data from the data file ( just so it is not empty)
        // User.insertMany(users)
        // Post.insertMany(posts)
    })
    .catch((error) => console.log(`${error} did not connect`))
