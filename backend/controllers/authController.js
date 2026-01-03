const adminModel = require("../models/adminModel");
const { createToken } = require("../utils/jwtToken");
const { responseReturn } = require("../utils/response");
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
            id: admin.id,
            role: admin.role,
          });
          res.cookie("access_token", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          });
          responseReturn(res, 200, {
            token,
            message: "Admin Login Successfully",
            admin: {
              id: admin._id,
              name: admin.name,
              email: admin.email,
              role: admin.role,
            },
          });
        } else {
          responseReturn(res, 404, { error: "Wrong password" });
        }
      } else {
        responseReturn(res, 404, { error: "Wrong email" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  // Get User:
  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        console.log("Seller info");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}
module.exports = new authController();
