import jwtMdlwr from "jsonwebtoken";


const jwtOptions = { expiresIn: '25000s' };

const secret = process.env.JWT_secret || "TOP_S3CrEt"


const jwtMdlwr = (req, res, next) => {

    console.log(req.headers);
    const token = req.headers.authorizations;


    const user_Id = jwtVerify(token);

    if (!user_Id) return res.status(401).json({ message: "Token invalide" });


    req.body.user_Id = user_Id;


};

const jwtVerify = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        const user_Id = decoded.data;
        return user_Id;
    } catch (err) {
        console.error('jwt.mdlwr.js - jwVerify - erreur => ', err.message)
    }
}

export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);

export default jwtMdlwr