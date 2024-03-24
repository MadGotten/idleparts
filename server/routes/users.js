const express = require('express');
const User = require('../models/user.model');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = express.Router();

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash);
};

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    const errorMessages = errors.array().map((error) => error.msg);
    res.status(400).json({ status: false, msg: errorMessages[0] });
  };
};

router.get('/authenticate', async (req, res) => {
  if (req.session.user) {
    res.status(200).json({ credentials: { user: req.session.user } });
  } else {
    res.status(401).json({});
  }
});

router.post(
  '/login',
  validate([
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password'),
  ]),
  async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    });
    if (user && (await comparePassword(password, user.password))) {
      req.session.user = email;
      req.session.user_id = user._id;
      res.status(200).json({
        status: true,
        msg: `Logged succesfully`,
        credentials: { user: req.session.user },
      });
    } else {
      res.status(400).json({ status: false, msg: 'Wrong credentials! try again.' });
    }
  }
);

router.post(
  '/register',
  validate([
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  ]),
  async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.create({
        email: email,
        password: await hashPassword(password),
      });
      req.session.user = email;
      req.session.user_id = user._id;
      res.status(201).json({
        status: true,
        msg: 'Your account has been created!',
        credentials: { user: req.session.user },
      });
    } catch (err) {
      res.status(400).json({ status: false, msg: 'This email already exists!' });
    }
  }
);

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy(function (err) {
      res.clearCookie('connect.sid');
      res.status(200).json({ status: true, msg: 'You have been logged out' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, msg: 'There was an error while logging out' });
  }
});

module.exports = router;
