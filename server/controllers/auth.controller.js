import UserModel from "../models/user.model.js";
import { getToken } from "../utils/token.js";

export const googleAuth = async(req,res)=>{
    try {
        const {name,email}=req.body;
        //agar user already exists toh usko wapas create mat karna, bas uska token generate karke de dena
        let user=await UserModel.findOne({email});
        if(!user){
            user=await UserModel.create({name,email});
        }
        let token=await getToken(user._id);
        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
        sameSite: "none",
        path:'/',
        maxAge: 7*24*60*60*1000 //7 days
        });
        return res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({message: "Error in Google Authentication", error: error.message});
    }
}

export const logOut = async(req,res)=>{
    try {
        await res.clearCookie("token");
        return res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        return res.status(500).json({message: "Error in logging out", error: error.message});
    }
}