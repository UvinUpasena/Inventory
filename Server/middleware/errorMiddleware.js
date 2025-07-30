const errorMiddleware = (err,req,res,next) =>{ //this function is accessing to err,req,res,next variables
    console.log('here is an error middleware');
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode);
    res.json({message:err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null})//error details is showed when in the development
} 
 
module.exports = errorMiddleware;