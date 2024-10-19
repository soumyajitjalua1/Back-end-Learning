import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
JsonWebTokenError
const userSchema = new Schema(
    {
        watchHistory:[
            {
                type: Schema.Types.ObjectId,
                ref:"Video"
            }

        ],
        userName: {
            type: String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email: {
            type: String,
            required: true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullName: {
            type: String,
            required: true,
            trim:true,
            index:true
        },
        password: {
            type: String,
            required: [true,'Password is required'],
        },
        avtar: {
            type: String, //cloudinary
            required:true,

        },
        coverimage: {
            type: String,
        },
        refreshToken: {
            type: String,
            default: "",
        }
    },
    {
        timestamps: true
    }
)

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,12)
    }
    next()
})
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password)
}


userSchema.methods.generateAccessToken = function(){
    return Jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.userName,
            fullname:this.fullName

        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.mathod.generateRefreshToken = function(){
    return Jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema)