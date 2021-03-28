const express = require('express');
const Joi = require('joi');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
//var Daten = require("dateFormat");


var films = [
    {id:1,name:"prison break",acteur :["Mariem","Jason Martin","Trudeau"],seance : [{id:1,datte:"26/09/2021",temps:"3:30",nbplacedispo:"4"},{id:2,datte:"25/09/2021",temps:"5:00",nbplacedispo:"20"}]},
    {id:2,name:"toujours beau",acteur:["Wael","mariem","ali"],seance:[{id:1,datte:"12/10/2021",temps:"4:30",nbplacedispo:"15"}]},
    {id:3,name:"salut le monde",acteur:["ahmed","imen","mohamed"],seance:[{id:1,datte:"23/12/2021",temps:"3:30",nbplacedispo:"30"}]},
    {id:4,name:"harry",acteur:["jackob","julie","Myrna"],seance:[{id:1,datee:"20/11/2021",temps:"7:30",nbplacedispo:"40"}]},
]

app.get('/api/films', (req,res) => {
    res.send(films);
})

app.get('/api/films/:id', (req,res) => {
    let film = films.find(f => f.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Films with this id is not found');
    res.send(film);
})

const Film_schema = Joi.object().keys({
    name : Joi.string().min(3).max(50).required(),
    acteur : Joi.array().min(3).max(50).required(),
    seance : Joi.object({
        datee: Joi.date().required(),
        temps: Joi.string().required(),
        nbplacedispo: Joi.number().integer().min(1).max(300).required()})
    
});

    
app.post('/api/films', (req,res) => {
    
    let validation_result = Joi.validate(req.body,Film_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
    
    let film = {
        id : films.length + 1,
        name : req.body.name,
        
        acteur : req.body.acteur,

        seance : req.body.seance
    };

    films.push(film);
    res.send(film);
})
app.put('/api/films/update/:id', (req,res) => {
    let film = films.find(s => s.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Film with this id is not found');

    let validation_result = Joi.validate(req.body, Film_schema);
    if(validation_result.error)
        return res.status(400).send(validation_result.error.details[0].message);
        
    film.name =  req.body.name;
    film.acteur =  req.body.acteur;
    film.seance =  req.body.seance;
    res.send(film);
})
app.delete('/api/films/delete/:id', (req,res) => {
    
    let film = films.find(s => s.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Film with this id is not found');
      
    films.splice(films.indexOf(film),1)
     
    res.status(200).json(films)
       
    })

app.post("/api/films/reservations/:id",function(req,res){

    let film = films.find(f => f.id === parseInt(req.params.id));
    if(!film) return res.status(404).send('Films with this id is not found');
           
    let seancee=film.seance.find(e=>e.id === parseInt(req.body.id));
    if  (!seancee) return res.status(404).send('seance with this id is not found');
    if (seancee.nbplacedispo!==0 && seancee.nbplacedispo >= req.body.nbPlaceAreserver){
        seancee.nbplacedispo-=req.body.nbPlaceAreserver;
        return(res.status(200).send('reservation with success'));
    }else{
        return(res.status(401).send('number place is not valid'));
    }
    })
    
app.listen(port,() => console.log(`Server starts on ${port}...`));