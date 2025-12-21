const adminModel = require("../models/adminModel");
const { responseReture } = require("../utils/response");

class authController {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      //console.log(admin);
      if (admin) {
        // if (admin.email === email && admin.password === password) {
        //   responseReture(res, 200, {
        //     message: "Admin Login successful",
        //     admin,
        //   });
        // } else {
        //   responseReture(res, 404, {
        //     error: "Admin email or password is incorrect",
        //   });
        // }
      } else {
        responseReture(res, 404, {
          error: "Admin email or password is incorrect",
        });
      }
    } catch (error) {
      responseReture(res, 500, { error: error.message });
    }
  };
}

module.exports = new authController();
