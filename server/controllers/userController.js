const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const { matchedData, validationResult } = require('express-validator');

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
};

const getUser = async (req, res) => {
  try {
    res.status(200).json({ user: req.session.user });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserEmail = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const { email } = data;
      const user = await User.findById(req.session.user_id);

      user.email = email;

      await user.save();
      req.session.user = email;
      return res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating account' });
    }
  }
  return res.status(400).json({ status: false, message: result.array() });
};

const updateUserPassword = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    const data = matchedData(req);
    try {
      const { password } = data;
      const user = await User.findById(req.session.user_id);

      user.password = await hashPassword(password);

      await user.save();
      return res.status(200).json({ message: 'Account updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Error updating account' });
    }
  }

  return res.status(400).json({ status: false, message: result.array() });
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.session.user_id);

    await user.deleteOne();
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.status(200).json({ message: 'Account deleted successfully' });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting account' });
  }
};

module.exports = { getUser, updateUserEmail, updateUserPassword, deleteUser };
