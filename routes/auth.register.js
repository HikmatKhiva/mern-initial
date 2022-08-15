const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../modules/User');
const config = require('config');

const router = Router();
// api/auth/register
router.post('/register', [
    check('email', 'check your email').isEmail(),
    check('password', 'password length min 6').isLength({ min: 6 })
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'error sign up'
            });
        }
        const { email, password } = req.body;
        const candidate = await User.findOne({ email });
        if (candidate) {
            return res.status(400).json({ message: 'this email already register' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email: email, password: hashedPassword });
        user.save();
        res.status(201).json({ message: `created new user ${email}` });
    } catch (e) {
        res.status(500).json({ message: "server went wrong" });
    }
})
// api/auth/login
router.post('/login', [
    check('email', 'check your email').normalizeEmail().isEmail(),
    check('password', 'wrong password check try again').exists()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'error sign in a'
            });
        }
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'user not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "wrong password check your password" });
        }
        const token = jwt.sign(
            { userId: user.id },
            config.get('jwtSecret'),
            { expiresIn: '1h' }
        )
        res.json({ token, userId: user.id })
    } catch (e) {
        res.status(500).json({ message: "server went wrong" });
    }
})
module.exports = router;