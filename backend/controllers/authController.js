const adminModel = require("../models/adminModel");
const { createToken } = require("../utils/jwtToken");
const { responseReture } = require("../utils/response");
const bcrypt = require("bcryptjs");

class authController {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      // console.log("Admin from DB:", admin);

      if (admin) {
        // Checking Admin:
        // const isAdminMatched = await bcrypt.compare(password, admin.password);
        // console.log(isAdminMatched);

        // if (isAdminMatched) {
        //   responseReture(res, 200, {
        //     message: "Admin Login successful",
        //     // admin,
        //   });
        // } else {
        //   responseReture(res, 404, {
        //     error: "Admin email or password is incorrect",
        //   });
        // }

        // Checking Admin password:
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          const token = await createToken({
            id: admin._id,
            role: admin.role,
          });
          res.cookie("access_token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          });
          responseReture(res, 200, {
            //  token,
            message: "Admin Login Successfully",
          });
        } else {
          responseReture(res, 404, { error: "Wrong password" });
        }
      }
    } catch (error) {
      responseReture(res, 500, { error: error.message });
    }
  };
}
module.exports = new authController();
