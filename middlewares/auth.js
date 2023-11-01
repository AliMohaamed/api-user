const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

    try{
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            const user = jwt.verify(token, "test");
            req.userId = user.id;  
    }else{
        res.status(401).json({message: "Unauthorized user!"});
    }
    next();
}catch(error){
    console.log(error);
    res.status(401).json({ message: "Unauthorized user!" });
}

}

module.exports = auth;