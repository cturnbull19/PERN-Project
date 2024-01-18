const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../secrets");
const SALT_ROUNDS = 10;

const { 
    createUser, 
    getAllUsers,
    getUserByEmail
} = require('../db/sqlHelperFunctions/users');

// GET - /api/users - get all users
router.get('/', async(req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        console.log('error from api router', error);
        next(error);
    }
});

// POST - /api/users/register - create a new user
router.post('/register', async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await createUser({ first_name, last_name, email, password: hashedPassword });
        delete user.password;
        
        const token = jwt.sign(user, JWT_SECRET);

        res.cookie('token', token, {
            sameSite: 'strict',
            httpOnly: true,
            signed: true,
        });
        
        delete user.password;

        res.send({ token, user });
    } catch (error) {
        console.log('error from POST api router', error);
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        const validPassword = await bcrypt.compare(password, user.password);

        if (validPassword) {
            const token = jwt.sign(trainer, JWT_SECRET);

            res.cookie('token', token, {
                sameSite: 'strict',
                httpOnly: true,
                signed: true
            });

            delete trainer.password;

            res.send({ token, user });
        }
    } catch (error) {
        console.log('error from post api router with login', error);
        next(error);
    }
});

router.post('/logout', async (req, res, next) => {
    try {
        res.clearCookie('token', {
            sameSite: 'strict',
            httpOnly: true,
            signed: true,
        });
        res.send({
            loggedIn: false,
            message: 'Logged Out',
        });
    } catch (error) {
        console.log('error from post api router with logout', error);
        next(error);
    }
});

module.exports = router;

