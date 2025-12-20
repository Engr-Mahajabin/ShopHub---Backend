const adminModel = require("../models/adminModel");

class authController {
  admin_login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      console.log(admin);
    } catch (error) {}
  };
}

module.exports = new authController();
