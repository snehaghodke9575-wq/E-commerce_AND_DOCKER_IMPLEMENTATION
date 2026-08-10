const {body,query,param,cookie,validationResult} = require('express-validator');

async function validateResult(req,res,next) {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({message : error.array()})
    }
next()
    
}



const registrationRules = [
    body("username")
    .notEmpty()
    .isString()
    .isLength({min:3})
    .withMessage("Username must be a string and minimum three character"),

    body("password")
    .isLength({min:3})
    .withMessage("Password length should be minimum of 3 character"),
    validateResult

]

const queryRules = [
    query("page")
    .isInt()
    .withMessage("Page number should be integer"),
    validateResult
]

const paramsRules =[
    param("id")
    .isMongoDbId()
    .withMessage("Invalidate id"),
    validateResult
]

const cookiesRules =[
    cookie("token")
    .notEmpty()
    .withMessage("Unauthorized"),
    validateResult
]

const createProductRules = [
    body("title")
    .notEmpty()
    .isString()
    .withMessage("Title must be string and required"),

    body("description")
    .notEmpty()
    .isString()
    .isLength({min:10}),

    body("price")
    .notEmpty()
    .isFloat()
    .withMessage("Price must be number"),

    body("stock")
    .notEmpty()
    .isInt({min : 0})
    .withMessage("stock is required"),

    body("category")
    .notEmpty()
    .isString()
    .withMessage("Category must be string"),


    validateResult

]

