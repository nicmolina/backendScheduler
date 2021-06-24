const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const authConfig = require('../config/auth')

const User = require('../models/user');

const router = express.Router();

router.use(cors());

function generateToken(params = {}) {
    return jwt.sign({ params }, authConfig.secret, {
        expiresIn: 86400,
    })
}

router.post('/register', async(req, res) => {
    const { email } = req.body;

    try{
        if(await User.findOne({ email }))
            return res.status(400).send({ message: 'User already exists' });

        const user = await User.create(req.body);

        //para seguranca do usuario na resposta da req teremos a password voltando undefined
        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        });

    } catch (err) {
        return res.status(400).send({ message: 'Registration Failed' });
    }
});

router.post('/authenticate', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user)
        return res.status(400).send({ message: 'User not found' });
    
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ message: 'Invalid password' });

    user.password = undefined;

    //gerando token

    res.send({ 
        user, 
        token: generateToken({ id: user.id }) 
    });
})

//todas rotas vao ser prefixadas com /user

module.exports = app => app.use('/user', router);