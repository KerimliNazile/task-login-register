import Users from "../Models/user.js"



//Get All Users

export const getAllUsers =async (req, res) => {
    try {
        const users = await Users.find({})
        res.send(users)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

//User get by id

export const getUsersById =async (req, res) => {
    try {
        const user = await Users.findById(req.params.id)

        res.send(user)

    } catch (error) {
        res.status(500).json({ message: error })
    }
}


//Add User
export const createAddUser = (req, res) => {
    const user = new Users({
        name: req.body.name,
        surname: req.body.surname,
        age: req.body.age,
        password: req.body.password
    })
    user.save()
    res.send({ message: "User Created" })
}

//User Update
export const getUsersUpdate = async (req, res) => {
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
}

//Delete User

export const getUsersDelete = async (req, res) => {
    try {
        await Users.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "User Deleted" })

    } catch (error) {
        res.status(500).json({ message: error })
    }
}


//Login
export const login = async (req, res) => {
    try {
      const { username, password, role,email } = req.body;
      const user = await Users.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(user.password);
        console.log(password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }
  
      const token = jwt.sign({ userId: user._id, role: role,email:email }, "secretKey", {
        expiresIn: "1h",
      });
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Login failed" });
    }
  };