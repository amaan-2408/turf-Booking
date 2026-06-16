import Business from "../model/Business.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

let Auth = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.send({ success: false, errType: 0 });
  }

  let result = await Business.find({ email: email });

  if (result.length !== 1) {
    return res.send({ success: false, errType: 1 });
  }

  const stored = result[0].password;
  let passwordMatches = false;

  // Support both legacy SHA-1 hashes and new bcrypt hashes.
  if (typeof stored === "string" && stored.startsWith("$2")) {
    passwordMatches = await bcrypt.compare(password, stored);
  } else {
    const sha1 = (await import("sha1")).default;
    passwordMatches = stored === sha1(password);

    if (passwordMatches) {
      const upgradedHash = await bcrypt.hash(password, 12);
      await Business.updateOne(
        { _id: result[0]._id },
        { password: upgradedHash },
      );
    }
  }

  if (!passwordMatches) {
    return res.send({ success: false, errType: 2 });
  }

  const businessObj = { _id: result[0]._id, email: result[0].email };
  const token = jwt.sign(businessObj, "kuch bhi");

  return res.send({ success: true, token, name: result[0].name });
};

export { Auth };
