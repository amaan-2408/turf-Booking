import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config/Config.js";

let IsLoggedIn = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res
      .status(401)
      .send({ success: false, message: "this user is unauthorized" });
  }

  // Token may be sent as "Bearer <token>" or just "<token>" — handle both
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    // jwt.verify checks the signature + expiry. jwt.decode just reads the
    // payload, which means anyone could forge a token. Always use verify.
    const obj = jwt.verify(token, JWT_KEY);

    if (!obj || !obj._id) {
      return res
        .status(401)
        .send({ success: false, message: "this user is unauthorized" });
    }

    req.obj = obj;
    next();
  } catch (err) {
    // Token is invalid, expired, or tampered with
    return res
      .status(401)
      .send({ success: false, message: "this user is unauthorized" });
  }
};
// let IsLoggedIn = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).send({
//       success: false,
//       message: "No Authorization header",
//     });
//   }

//   const token = authHeader.startsWith("Bearer ")
//     ? authHeader.slice(7)
//     : authHeader;

//   try {
//     const obj = jwt.verify(token, JWT_KEY);

//     req.obj = obj;
//     next();
//   } catch (err) {
//     console.log("JWT Error:", err.message);

//     return res.status(401).send({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export default IsLoggedIn;
