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
        const date = new Date(req.body.day)

        console.log(date);

        if(await Hours.findOne({ day: date }))
            return res.status(400).send({ message: 'Já tem horário cadastrado para este dia' });

        const hours = await Hours.create(req.body);

        return res.send({hours});
    } catch (err) {
        return res.status(400).send({ message: `${err}` });
    }
});

router.post('/specificday', async (req, res) => {
    try{
        Hours.findOne({ userId: req.body.userId, day: req.body.day }, function(err, obj){
            if(err){
                return res.send(err);
            } else {
                return res.send(obj);
            }   
        })
    } catch (err) {
        return res.status(400).send({ message: `${err}` })
    }
})

router.post('/all', async (req, res) => {
    try{
        Hours.find({ userId: req.body.userId }, function(err, obj){
            if(err){
                return res.send(err);
            } else {
                let sum = 0;

                obj.map((day, index) => {
                    sum += day.hours;
                });

                return res.send({sum});
            }   
        })
    } catch (err) {
        return res.status(400).send({ message: `${err}` })
    }
})

//todas rotas vao ser prefixadas com /hour

module.exports = app => app.use('/hour', router);