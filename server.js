import express from 'express';
import UserModel from './models/User.js';
import mongoose from 'mongoose';
import cors from 'cors'

const PORT = process.env.PORT || 1310

mongoose
    .connect('mongodb+srv://serhii:Pravdass1488@wedding1.emnnyw8.mongodb.net/wedding?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((error) => console.log('DB error', error));


const app = express()

app.use(cors())
app.use(express.json())
  
app.get('/users', async (req, res) => {
    try {
      const users = await UserModel.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Не удалось получить пользователей' });
    }
  });


app.post('/', async (req, res) => {
    try {
        const doc = new UserModel({
            firstName: req.body.firstName,
            secondName: req.body.secondName,
            willAttend: req.body.willAttend,
            unableToAttend: req.body.unableToAttend,
            willRespondLater: req.body.willRespondLater,
            willChampagne: req.body.willChampagne,
            willWhiteWine: req.body.willWhiteWine,
            willRedWine: req.body.willRedWine,
            willCognac: req.body.willCognac,
            willGorilka: req.body.willGorilka,
            willВіski: req.body.willВіski,
            willNonAlcoholicDrinks: req.body.willNonAlcoholicDrinks,
        });
    
        const user = await doc.save();
    
        res.json(user)
    } catch (error) {
        onclose.log(error)
        res.status(500).json({
            message: 'Что то пошло не так :| ',
        })
    }
} )


app.listen(PORT, () => console.log(`server started in ${PORT}`))
