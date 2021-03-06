/**
 * Mise en Place de notre serveur
 * NodeJS grâce au Framework Express.
 * @type {createApplication}
 */
const express = require('express');

/**
 * Création du serveur express.
 */
const app = express();
const port = 3000;

/**
 * Importer le package 'nunjucks'
 * Configuration avec Express
 * https://mozilla.github.io/nunjucks/getting-started.html
 */
const nunjucks = require('nunjucks');

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

/**
 * Importer le package 'lowdb'
 * https://www.npmjs.com/package
 */
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('data/contacts.json');
const db = low(adapter);
/**
 * Pour récupérer les données POST, nous avons besoin
 * de la librairie 'body-parser'. Elle nous
 * permettra de manipuler les données 'POST' de la requète.
 */
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * Les objets 'req' (requete) et 'res' (réponse)
 * sont exactement les mêmes que ceux fournit par Node.
 */
app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/views/html/index.html');
    res.redirect('/contacts');
});

app.get('/contacts', (req, res) => {

    // -- Récupérer la liste des contacts
    const contactsDb = db.get('contacts'). value();

    // res.sendFile(__dirname + '/views/html/contacts.html');
    res.render('html/contacts.html',{
        contacts: contactsDb
    });
});

app.get('/ajouter-un-contact', (req, res) => {
    res.render('html/ajouter-un-contact.html');
});

app.post('/ajouter-un-contact', (req, res) => {
    /**
     * lors de la soumission du formulaire avec
     * la méthode POST, c'est cette fonction qui
     * sera executée.
     */
    // console.log( req. body );
    const contact = req.body;

    // On ajoute le nouveau contact dans notre fichier JSON
    db.get('contact')
        .push(contact)
        .write();

    // On redirige l'utilisateur sur les contacts
    res.redirect ('/contact');

});

app.get('/contact', (req, res) => {
    // res.sendFile(__dirname + '/views/html/contact.html');
    res.render('html/contact.html');
});

/**
 * Démarrer l'écoute des connexions sur le port 3000
 */
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}!`)
});