const Joi = require('joi');
const express = require('express');
const { request } = require('http');
const app = express()
app.use(express.json());

const recipy = [
    { id:1, racipeName: 'masala Dose'},
    { id:2, racipeName: 'Chitranna'},
    { id:3, racipeName: 'Puliyogare'},
    { id:4, racipeName: 'Chapati'},
]

// To get all the recepy from database

app.get('/api/recipy',(req, res) =>{
    res.send(recipy);
});


// To get particular racipy of the provided Id
app.get('/api/recipy/:id',(req, res) =>{
    const recipe = recipy.find(c => c.id === parseInt(req.params.id))

    if(!recipe) return res.status(404).send('The Course with the give ID was not found.')

    res.send(recipe)
});


// To add more racipy to the database
app.post('/api/recipy/', (req, res) => {

    const { error } = validateRacipy(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    const recipi = {
        id: recipy .length + 1,
        racipeName : req.body.racipeName
    };
    recipy.push(recipi);
    res.send(recipi);
});

// To update specific recipy 

app.put('/api/recipy/:id', (req, res) => {
    const recipe = recipy.find(c => c.id === parseInt(req.params.id));

    if(!recipe) return res.status(404).send('The racipy with the give ID was not found.');


    const { error } = validateRacipy(req.body)
    if(error) return res.status(404).send(error.details[0].message);

    //update racipy
    recipe.racipeName = req.body.racipeName;
    //return the updated racipy
    res.send(recipe);
});

// To delete a racipie

app.delete('/api/recipy/:id', (req, res) => {
    const recipe = recipy.find(c => c.id === parseInt(req.params.id));

    if(!recipe) return res.status(404).send('The racipy with the give ID was not found.');
    const index = recipy.indexOf(recipe)

    recipy.splice(index, 1);

    res.send(recipe);
});


//PORT or envinorment variable
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening at port ${port}...`));



function validateRacipy(racipi){
    const schema = {
        racipeName: Joi.string().min(3).required()
    };
    return Joi.validate(racipi, schema);
}