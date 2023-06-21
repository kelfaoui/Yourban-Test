var express = require('express')
var bodyParser = require('body-parser')
var jsonData = require("./data/MOCK_DATA.json")
var cors = require('cors');

var app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(jsonData);
});

// Ajouter une ligne
app.post('/commerces/', function (req, res) {
    let fs = require('fs')
    let text = fs.readFileSync('./data/MOCK_DATA.json', 'utf-8')
    var json = JSON.parse(text)
    json.push(req.body)
    fs.writeFileSync("./data/MOCK_DATA.json", JSON.stringify(json, 0, 1))
    return(res.send("Success"))
});

// Modifier une ligne
app.put('/commerces/update/:id', function (req, res) {
    let fs = require('fs')
    let text = fs.readFileSync('./data/MOCK_DATA.json', 'utf-8')
    var json = JSON.parse(text)
    json.some(function(elt){
        if (elt.id == req.params.id){
            elt.etablissement_type = req.body.etablissement_type
            elt.etablissement = req.body.etablissement
            elt.location = req.body.location
            elt.address = req.body.address
            elt.mail = req.body.email
            return true; 
        }
     });
    fs.writeFileSync("./data/MOCK_DATA.json", JSON.stringify(json, 0, 1))
    return(res.send("Update Success"))
});

// Supprimer une ligne
app.delete('/commerces/delete/:id', function (req, res) {
    let fs = require('fs')
    let text = fs.readFileSync('./data/MOCK_DATA.json', 'utf-8')
    var json = JSON.parse(text)
    console.log(req.params.id)
    let newJson = json.filter(elt => elt.id != req.params.id);
    console.log(newJson)
    fs.writeFileSync("./data/MOCK_DATA.json", JSON.stringify(newJson, 0, 1))
    return(res.send("Success"))
});

// Obtenir un établissement avec le nom
app.get('/commerces/:name', function (req, res) {
    let fs = require('fs')
    let text = fs.readFileSync('./data/MOCK_DATA.json', 'utf-8')
    var json = JSON.parse(text)
    console.log(req.params.id)
    let commerce = json.filter(elt => elt.etablissement === req.params.name);
    return(res.send(commerce))
});

// Supprimer tous les établissements d’une ville
app.delete('/commerces/delete_location/:location', function (req, res) {
    let fs = require('fs')
    let text = fs.readFileSync('./data/MOCK_DATA.json', 'utf-8')
    var json = JSON.parse(text)
    console.log(req.params.id)
    let newJson = json.filter(elt => elt.location != req.params.location);
    console.log(newJson)
    fs.writeFileSync("./data/MOCK_DATA.json", JSON.stringify(newJson, 0, 1))
    return(res.send("Success"))
});

// Supprimer tous les établissements d’un secteur d’activité
app.delete('/commerces/delete_type/:type', function (req, res) {
    let fs = require('fs')
    let text = fs.readFileSync('./data/MOCK_DATA.json', 'utf-8')
    var json = JSON.parse(text)
    console.log(req.params.id)
    let newJson = json.filter(elt => elt.etablissement_type !== req.params.type);
    console.log(newJson)
    fs.writeFileSync("./data/MOCK_DATA.json", JSON.stringify(newJson, 0, 1))
    return(res.send("Success"))
});



// Obtenir tous les commerces d’un secteur d’activité donné
app.get('/commerces/etablissement_type/:name', function (req, res) {
    let arr = jsonData.filter(elt => elt.etablissement_type === req.params.name);
    res.send(arr);
});


// Obtenir tous les commerces d’une ville donnée
app.get('/commerces/location/:name', function (req, res) {
    let arr = jsonData.filter(elt => elt.location === req.params.name);
    res.send(arr);
});

// Obtenir tous les commerces d’un secteur d’activité dans une ville donnée
app.get('/commerces/type-location/:type/:location', function (req, res) {
    let arr = jsonData.filter(elt => elt.location === req.params.location
        && elt.etablissement_type === req.params.type);
    res.send(arr);
});


const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Le server est démarré au port : ${PORT} `);
}) 