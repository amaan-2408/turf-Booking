import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

let Auth = async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.send({ success: false, errType: 0 });
  }

  let result = await User.find({ email: email });

  if (result.length !== 1) {
    return res.send({ success: false, errType: 1 });
  }

  const stored = result[0].password;
  let passwordMatches = false;

  // Support both old SHA-1 hashes (legacy data) and new bcrypt hashes.
  // Bcrypt hashes always start with $2 — use that to tell them apart.
  if (typeof stored === "string" && stored.startsWith("$2")) {
    passwordMatches = await bcrypt.compare(password, stored);
  } else {
    // Legacy SHA-1 path — auto-upgrade to bcrypt on successful login
    const sha1 = (await import("sha1")).default;
    passwordMatches = stored === sha1(password);

    if (passwordMatches) {
      const upgradedHash = await bcrypt.hash(password, 12);
      await User.updateOne({ _id: result[0]._id }, { password: upgradedHash });
    }
  }

  if (!passwordMatches) {
    return res.send({ success: false, errType: 2 });
  }

  const userobj = { _id: result[0]._id, email: result[0].email };
  const token = jwt.sign(userobj, "kuch bhi");

  return res.send({ success: true, token, name: result[0].name });
};

export { Auth };
