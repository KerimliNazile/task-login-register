import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"

// PORT=5000
dotenv.config()

const { Schema } = mongoose;
const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: String, required: true },
    password: { type: String, required: true },
}, { timestamps: true })

const app = express()

//Midleware
app.use(cors())
app.use(bodyParser.json())

const Users = mongoose.model("users", userSchema)

//Get All Users

app.get("/users", async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//User get by id

app.get("/users/:id", async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)

        res.send(user)

    } catch (error) {
        res.status(500).json({ message: error })
    }
})


//Add User
app.post("/register", (req, res) => {
    const user = new Users({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        password: req.body.password
    })
    user.save()
    res.send({ message: "User Created" })
})

//User Update
app.put("/users/:id", async (req, res) => {
    try {
        const user = await Users.findByIdAndUpdate(req.params.id)

        if (user) {
            user.name = req.body.name,
                user.surname = req.body.surname,
                user.age = req.body.age,
                user.password = req.body.password

            await user.save()
            res.json(user)
        } else {
            res.status(404).json({ message: "Not Found" })
        }
    } catch (error) {
        res.status(500).json({ message: error })
    }
})

//Delete User

app.delete("/users/:id", async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User Deleted" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
})

// const PORT = process.env.PORT
// const url = process.env.CONNECTION_URL.replace("<password>", process.env.PASSWORD)

mongoose.connect('mongodb+srv://nazilya:nazilya@cluster0.haleq1p.mongodb.net/')
    .then(() => console.log("Connected"))
    .catch(err => console.log("Db not connect" + err))

app.listen(5000, () => {
    console.log("Server Connection");
})
