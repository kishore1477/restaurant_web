import User from "../moddle/User.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import transporter from "../config/emailConfig.js";
import Contact from "../moddle/Contact.js";
import nodemailer from 'nodemailer';
class UserController {
    // User Register
    static UserRegisteration = async (req, res) => {
        try {
            console.log("body ", req.body)
            const { name, email, password } = req.body;
            // Check if required fields are provided
            if (!name || !email || !password) {
                return res.status(400).json({ "message": 'All fields are required - name,email,password' });
            }
            // Check if the email already exists
            const findsavedUser = await User.findOne({ email });

            if (findsavedUser) {
                return res.status(409).json({ "message": 'Email already exists' });
            }
            // Generate hash for the password
            const salt = await bcrypt.genSalt(10);
            const hashPass = await bcrypt.hash(password, salt);
            // Create a new user
            const UserData = new User({
                name: name,
                email: email,
                password: hashPass,
            });
            // Save the user to the database
            await UserData.save();
            // Fetch the user after saving
            const findsavedUserAfterSaved = await User.findOne({ email });

            // Check if the user was found after saving
            if (!findsavedUserAfterSaved) {
                // If not found, something went wrong
                return res.status(500).json({ "message": 'Error during signup: User not found after saving' });
            }
            // Generate JWT token 
            const token = jwt.sign({ userID: findsavedUserAfterSaved._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });
            // Respond with success and token
            return res.status(200).json({ "token": token, "message": "Signup successfully." });

        } catch (error) {
            // Handle unexpected errors
            return res.status(500).json({ "message": 'Internal server error', error });
        }

    }

    //  User login 
    static UserLogin = async (req, res) => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
              return  res.status(400).json({ "message": "All field are required" })
            }
            const user = await User.findOne({ email })
            if (!user) {
              return  res.status(400).json({ "message": `Account doesn't exist with ${email}` })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (user.email !== email || !isMatch) {
             return   res.status(400).json({ "message": "Invalid credentials" })
            }
           console.log("ergeeh")
            //  token gnerate for login
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' })
            const { name, email: userEmail } = user
            const userDetails = {
                name, email: userEmail
            }
          return  res.status(200).json({ "loginToken": token, "message": "Login Successfully", userDetails })
        } catch (error) {
            console.error("Error generating JWT token:", error);
          return  res.status(500).json({ "message": "Internal server error occured",error:error.message })

        }
    }
    // user change password 
    static changePassword = async (req, res) => {
        const { password, password_confirm } = req.body
        if (password && password_confirm) {
            if (password === password_confirm) {
                const salt = await bcrypt.genSalt(10)
                const hashPass = await bcrypt.hash(password, salt)

                await User.findByIdAndUpdate(req.user._id, { $set: { password: hashPass } })
                res.status(200).json({ msg: "Password changed successfully" })
            } else {

                res.status(400).json({ msg: "password does not  match" })
            }
        } else {
            res.status(400).json({ msg: "All fields are required!" })
        }
    }
    static LoggedUserData = (req, res) => {
const userDetails = req.user
     return    res.status(200).json({data: userDetails})
    }

    static sendEmail = async (req, res) => {
        const { email } = req.body

        if (email) {

            // try {


            const user = await User.findOne({ email })

            if (user) {
                const secret = user._id + process.env.JWT_SECRET_KEY
                const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '45m' })
                const link = `https://8000-kishorek114-notetakinga-ukzh1bagysq.ws-eu74.gitpod.io/passwordReset/${user._id}/${token}`


                // Send Email
                let info = await transporter.sendMail({
                    from: "kishorejaipal477@gmail.com",
                    to: user.email,
                    subject: "KishoreAuth - Password Reset Link",
                    html: `<a href=${link}>Click Here</a> to Reset Your Password`
                })

                res.status(200).json({ info: info, msg: "Click the provided link  via email" })
            } else {
                res.status(200).json({ "status": "failed", msg: "Email doesn't exists " })

            }

            // } catch (error) {
            //         res.status(400).json({"message":"Internal error", "Error":error})
            // }
        } else {
            res.status(200).json({ "status": "failed", msg: "Email Field is Required" })
        }
    }

    static passwordReset = async (req, res) => {
        const { password, password_confirm } = req.body

        const { id, token } = req.params

        const user = await User.findById(id)

        const new_secret = user._id + process.env.JWT_SECRET_KEY
        try {
            jwt.verify(token, new_secret)
            // let verifyToken = jwt.verify(token, new_secret)
            // 
            if (password && password_confirm) {
                if (password === password_confirm) {
                    const salt = await bcrypt.genSalt(10)
                    const newHashPassword = await bcrypt.hash(password, salt)
                    await User.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } })
                    res.status(200).send({ "status": "success", "message": "Password Reset Successfully" })
                } else {
                    res.status(400).send("Password does not match!")
                }
            } else {
                res.status(400).send("All field are required.")

            }
        } catch (error) {
            res.status(400).send("Internal Server Error Occured")

        }
    }

    static Contact = async (req, res) => {
        // handle request body  parameters error
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const { name, email, msg } = req.body

        if (name && email && msg) {
            const contactData = new Contact({
                name: name,
                email: email,
                msg: msg,

            })
            const UserDataSave = await contactData.save()
            res.status(200).json({ msg: 'Thanks for contact us, we will touch with you within in 2 days.' })

        } else {
            res.status(400).json({ msg: 'All fields are required' })
        }

    }

}

export default UserController