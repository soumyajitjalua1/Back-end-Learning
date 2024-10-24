import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req,res)=>{
    // get user ditals form frontend
    // validation -not empty 
    //chack alrady exiest or not
    //hash password
    //chack for images, chack for avatar 
    //upload the image to cludinary avtar
    //create user
    //send the response
    //return res

    const { fullName, email, username, pasword }= req.body
    console.log("email",email);

    // if(fullName===""){
    //     throw new ApiError(400,"Full name is required")
    // }
    if(
        [fullName, email, username ,pasword].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required")
    }
    const  existingUser = await User.findOne({

        $or:[
            {email},
            {username}
        ]
    })

    if(existingUser){
        throw new ApiError(409,"User already exists")
    }

    //image handeling
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar upload failed")
    }

    const user = await User.create({
        fullName,
        email,
        username:username.toLowerCase(),
        pasword,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""
    })
    const createUser =await User.findById(user_id).select(
        "-password -refreshToken"
    )
    if(!createUser){
        throw new ApiError(500,"Somethings went wrong while regestering the user")
    }
    return res.status(201).json(
        new ApiResponse(201,"User registered successfully",createUser)
    )
});
    

export { registerUser };