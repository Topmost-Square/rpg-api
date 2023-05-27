const express = require('express');
const {authorize} = require("../../utils/auth");
const {userExists, register} = require("../../services/auth");
const router = express.Router();
const {compare, hash} = require("bcryptjs");
const {sign, verify} = require('jsonwebtoken');

const generateAccessToken = (email) => {
    return sign({
        email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d'
    });
}

router.get(
    '/me',
    authorize,
    async (req, res, next) => {
        try {
            return res.status(200).json(req.user);
        } catch (error) {
            next(error);
        }
    },
);

router.post('/register', async (req, res, next) => {
    const result = await userExists(req.body.email);

    if (result.length) {
        throw new Error('Email in use');
    }

    const password = await hash(req.body.password, 12);

    const resultRegister = await register(req.body.email, password);

    if (!resultRegister) {
        throw new Error('Couldnt register user');
    }

    const token = generateAccessToken(req.body.email);

    return res.status(201).json({
        token,
        email: req.body.email
    });

});

router.post('/login', async (req, res, next) => {
    const result = await userExists(req.body.email);

    if (!result.length) {
        throw new Error('Email not found');
    }

    const [user] = result;

    const passwordMatch = await compare(req.body.password, user.password);

    if (!passwordMatch) {
        throw new Error('Wrong password');
    }

    const token = generateAccessToken(req.body.email);

    return res.status(200).json({
        token,
        email: req.body.email
    });

});

module.exports = router;