const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  // Header থেকে token বের করা: "Authorization: Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Login করা নেই, token পাওয়া যায়নি" });
  }

  const token = authHeader.split(" ")[1]; // "Bearer xxxxx" থেকে শুধু "xxxxx" নেওয়া

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // পরের route এ req.userId ব্যবহার করা যাবে
    next(); // ঠিক থাকলে পরের কাজ চালিয়ে যাওয়ার অনুমতি
  } catch (err) {
    return res.status(401).json({ message: "Invalid বা মেয়াদোত্তীর্ণ token" });
  }
};

module.exports = protect;