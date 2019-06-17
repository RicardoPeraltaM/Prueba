require('./config/config')


const express = require('express');
const app = express();


const bodyParser = require('body-parser')

const mongoose = require('mongoose');

const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:4200/'
}));




app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())


app.use(require('./routes/index'))






mongoose.set('useCreateIndex', true)

let password = encodeURI('Corc1996')

mongoose.connect(`mongodb+srv://Test1:Corc1996@cluster0-ff14i.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true }, (err, res) => {
    if (err)
        throw err;


    console.log('Base de datos online');

})



app.listen(process.env.PORT, () => {
    console.log('escuchando puerto', process.env.PORT);

})