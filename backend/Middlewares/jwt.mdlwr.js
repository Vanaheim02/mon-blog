import jwt from "jsonwebtoken";

const jwtOptions = { expiresIn: '25000s' };
const secret = process.env.JWT_SECRET || "TOP_S3CrEt";

// Middleware pour vérifier le token JWT
const jwtMdlwr = (req, res, next) => {
    console.log(req.headers);

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Aucun token fourni" });
    }

    const user_id = jwtVerify(token);

    if (!user_id) {
        return res.status(401).json({ message: "Token invalide" });
    }

    req.body.user_id = user_id;
    next();
};

// Fonction pour vérifier et décoder le token JWT
const jwtVerify = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        const user_id = decoded.data;
        return user_id;
    } catch (err) {
        console.error('Erreur lors de la vérification du token JWT : ', err.message);
        return null;
    }
};

// Fonction pour signer un token JWT
export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);

export default jwtMdlwr;
