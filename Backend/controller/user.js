const userSchema = require("../model/userModel");
const bcryptjs=require('bcryptjs');
const validator = require('validator');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const jwt=require('jsonwebtoken')


// Create a nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
    host: process.env.email_host,
    port: process.env.email_port,
    auth: {
      user: process.env.email_user, 
      pass: process.env.email_password, 
    },
});

const getUserData = async (req, res) => {
    try {
        // Fetch user data from the database
        const userData = await userSchema.find();

        // Check if user data is empty
        if (!userData || userData.length === 0) {
            return res.status(404).json({ "message": "No user data found." });
        }

        // Respond with the user data
        res.status(200).json(userData);
    } catch (error) {
        // Handle unexpected errors
        console.error("Error while fetching user data:", error);
        res.status(500).json({ "message": "Internal server error." });
    }
};



const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ "message": "Username, email, and password are required." });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ "message": "Invalid email format." });
        }

        if (password.length < 8) {
            return res.status(400).json({ "message": "Password must be at least 8 characters long." });
        }

        const user=await userSchema.find({email});
        // console.log(user);
        if(user.length>0){
            return res.status(400).json({"message":"Already Registered Mail"})
        }

        // Hash the password
        const hashedPassword = await bcryptjs.hash(password, 10);

        // Create a new user instance
        const newUser = new userSchema({
            username: username,
            email: email,
            password: hashedPassword,
        });

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Check if user was successfully saved
        if (!savedUser) {
            return res.status(500).json({ "message": "Failed to create the user." });
        }

        // Respond with the created user
        res.status(200).json(savedUser);
    } catch (error) {
        // Handle unexpected errors
        console.error("Error during user registration:", error);
        res.status(500).json({ "message": "Internal server error." });
    }
};


const passwordReset=async(req,res)=>{
    try{
        // console.log(req.body);
        const {email}  = req.body;
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email is not Registered.' });
        }

        // Generate a unique reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        // Set the token expiration (e.g., 1 hour)
        const tokenExpiration = Date.now() + 3600000; // 1 hour in milliseconds

        // Save the token and expiration in the user document
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = tokenExpiration;
        await user.save();

        const mailOptions = {
            from: 'Cineflix support<support@cineflix.com>', // Replace with your email
            to: email,
            subject: 'Password Reset',
            text: `To reset your password, click the following link: localhost:${4200}/reset-password/${resetToken}`,
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Password reset email sent.' });

    }catch(error){
        console.error('Error initiating password reset:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}


const passwordChange=async(req,res)=>{
    try {
        const { token } = req.params;
        const { password } = req.body;
        // console.log(token);
        // Find the user by the reset token
        const user = await userSchema.findOne({
          resetPasswordToken: token,
          resetPasswordExpires: { $gt: Date.now() }, // Check if token is not expired
        });

        
    
        if (!user) {
          return res.status(400).json({ message: 'Invalid or expired token.' });
        }
    
        // Hash the new password
        const hashedPassword = await bcryptjs.hash(password, 10);
    
        // Update the user's password and clear the reset token fields
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(200).json({ message: 'Password reset successfully.' });
      } catch (error) {
        console.error('Error resetting password:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }

}


const loginUser=async(req,res)=>{
        try{
            const {email,password}=req.body;
            const secret=process.env.secret;
            if(!email || !password){
                return res.status(400).json({ message: 'Required fields are missing' });
            }
            const user=await userSchema.findOne({email});
            if(!user){
                return res.status(400).json({message:"User does not Exist"})
            }
            const isPasswordValid = await bcryptjs.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid UserName or password.' });
            }
            const token = jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2h' });
            res.status(200).json({ userdata: user,token: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    
}



module.exports={getUserData,registerUser,passwordReset,passwordChange,loginUser};
