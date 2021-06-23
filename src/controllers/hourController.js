const express = require('express');
const authMiddleware = require('../middlewares/auth');
const cors = require('cors');
const Hours = require('../models/workedHours');

const router = express.Router();

router.use(cors());

//verifica se ha token na requisicao utilizando um middleware
router.use(authMiddleware);

router.post('/register', async(req, res) => {
    try{
        const hours = await Hours.create(req.body);

        return res.send({hours});
    } catch (err) {
        return res.status(400).send({ error: `${err}` });
    }
});

router.post('/specificday', async (req, res) => {
    try{
        Hours.findOne({ day: req.body.day }, function(err, obj){
            if(err){
                return res.send(err);
            } else {
                return res.send(obj);
            }   
        })
    } catch (err) {
        return res.status(400).send({ error: `${err}` })
    }
})

router.get('/all', async (req, res) => {
    try{
        Hours.find({ }, function(err, obj){
            if(err){
                return res.send(err);
            } else {
                return res.send(obj);
            }   
        })
    } catch (err) {
        return res.status(400).send({ error: `${err}` })
    }
})

//todas rotas vao ser prefixadas com /hour

module.exports = app => app.use('/hour', router);