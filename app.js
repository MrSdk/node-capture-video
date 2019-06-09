let jsSHA = require('jssha');
let btoa = require('btoa');

let applicationId = "61234e.vidyo.io";
let developerKey = "c924dd5bb4e04f77b4329b5a67161629";

const express = require('express')
const app = express()
const port = 3000 

app.set('view engine', 'ejs');  
app.use('/public', express.static('public'));

app.get('/',(req,res)=>{ 
    let thirtyMinutes = 120 * 60;
    
    token = generateToken(thirtyMinutes); 
    
    res.status(200).render('index',{ token: token })
});

app.get('/second',(req,res)=>{ 
    let thirtyMinutes = 120 * 60;
    
    token = generateToken(thirtyMinutes); 
    
    res.status(200).render('index2',{ token: token })
});

// app.get('/token', (req, res) => {

// });
// res.send(response);
// })


function getRandomInt() {
return Math.floor(Math.random() * Math.floor(9999));
}

function generateToken(expiresInSeconds) {
var EPOCH_SECONDS = 62167219200;
var expires = Math.floor(Date.now() / 1000) + expiresInSeconds + EPOCH_SECONDS;
var shaObj = new jsSHA("SHA-384", "TEXT");
shaObj.setHMACKey(developerKey, "TEXT");
jid = "demoUser" + getRandomInt() + '@' + applicationId;
var body = 'provision' + '\x00' + jid + '\x00' + expires + '\x00';
shaObj.update(body);
var mac = shaObj.getHMAC("HEX");
var serialized = body + '\0' + mac;
return btoa(serialized);
}
// console.log(generateToken(30 * 60))

app.listen(port, () => console.log(`Listening on port ${port}!`))