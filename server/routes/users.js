const express = require('express')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const router = express.Router()

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hashSync(password, salt)
}

const comparePassword = async (password, passwordHash) => {
  return await bcrypt.compare(password, passwordHash)
}

router.get('/authenticate', async (req, res) => {
    if(req.session.user){
      res.status(200).json({ credentials: {user: req.session.user} })
    } else {
      res.status(401).json({})
    }
})  
  
router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({
      email: email,
    })
    if(user && await comparePassword(password, user.password)) {
      req.session.user = email
      req.session.user_id = user._id
      res.status(200).json({ status: 'success', message: `Logged succesfully`, credentials: {user: req.session.user}});
    } else {
      res.status(400).json({ status: 'error', message: 'Wrong credentials! try again.'});
    }
})
  
router.post('/register', async (req, res) => {
    const {email, password, password2} = req.body
    try {
      if (password !== password2) { return res.status(400).json({status: 'error', message: 'Password do not match'})}
      const user = await User.create({
        email: email,
        password: await hashPassword(password),
      })
      req.session.user = email
      req.session.user_id = user._id
      res.status(201).json({status: 'success', message: 'Your account has been created!', credentials: {user: req.session.user}})
    } catch(err){
      res.status(400).json({status: 'error', message: 'This email already exists!'})
    }
})
  
router.get('/logout', async (req, res) => {
    req.session.destroy(function(err) {
      res.clearCookie('connect.sid')
      res.status(200).json({status: 'success', message: 'You have been logged out'})
    })
})

module.exports = router