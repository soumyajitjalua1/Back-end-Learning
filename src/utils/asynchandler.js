const asyncHandler =(requestHandler) =>{
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    };
}



// Async await function


// const asyncHandler =(fn)=>async(req,res,next)=>{
//     try{
//         await fn(req,res,next)
//     }
//     catch(err){
//         res.status(err.code|| 500).json({
//             success:false,
//             massage:err.massge
//         })
//     }
// }
export {asyncHandler}