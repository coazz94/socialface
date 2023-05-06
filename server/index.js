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

/* CONFIGURATIONS */
// because of modules we have to use these configs
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()

const app = express()

app.use(express.json())

app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))

app.use(morgan("common"))

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))

app.use(cors)

// set the directory where we save the files
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

/* FILE STORAGE */
// any time some save a file it is going to be saved in the declared folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage })
