import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    //db operations

    const { username, email, password } = req.body;
    try {
        //HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);
        //CREATING NEW USER AND SAVE TO DATA BASE
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        })

        console.log(newUser);

        res.status(201).json({ message: "User created successfully" });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: " Failed to create user" })
    }
}
    export const login = async(req, res) => {
        //db operations
        const { username, password } = req.body;
        try{
        //check if user exists
        const user = await prisma.user.findUnique({
            where:{username}
        })

        if(!user) {
            return res.status(401).json({message: "Invalid Credentials!"})
        }
        //check user password is correct

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
             return res.status(401).json({message: "Invalid Credentials!"});
        }
        //generate cookie token and send to the user
         const age = 1000*60*60*24*7;
const token = jwt.sign({
    id: user.id,
    isAdmin: false,
}, process.env.JWT_SECRET_KEY , {
    expiresIn: age
})

const {password: userPassword, ...userInfo} = user

         res.cookie("token" , token , {
            httpOnly: true,
           secure: true ,// make sure to set it true while deployment,
           maxAge: age,
            sameSite: "Lax", 
         }).status(200).json({ message: userInfo})
        }
        catch(err){
            console.log(first)
            res.status(500).json({messge: "Failed to login!"})
        }

    }

    export const logout = (req, res) => {
        //db operations
        res.clearCookie("token").status(200).json({ message: "Logout Sucessfully" })
    }

