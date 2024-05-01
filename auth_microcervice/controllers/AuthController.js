import bcrypt from "bcrypt";
import User from "../schema/userModel.js";
import jwt from "jsonwebtoken";

const addUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "user already exists" });
    }

    // hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log(newUser);
    return res.json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    return res
      .status(500)
      .json({ message: "Something went wrong, try again later", error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: "invalid credentials" });
      } else {
        const payload = {
          id: user._id,
          name: user.userName,
          email: user.email,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
          expiresIn: "365d",
        });
        return res.status(200).json({message:"logged in successfully", access_token: `Bearer ${token}` });
      }
    } else {
      res.status(401).json({ message: "email not exit" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong, try again later", error });
  }
};

const userVerify = async (req, res) => {
  const user = req.user;
  return res.status(200).json({user:user})
}

export { addUser, login, userVerify };
