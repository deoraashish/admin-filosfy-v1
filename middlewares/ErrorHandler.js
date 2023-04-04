const errorHandler = (err,req,res,next) => {
    let message = {
        status : 500,
        message:err.message,
        success:false
    }
    return res.json(message);
}

export default errorHandler;