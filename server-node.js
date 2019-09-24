/**
 * Importer le module HTTP.
 * ------------------------------------
 * Toutes les fonctions du module HTTP
 * sont maintenant disponible dans notre
 * constante 'http'.
 * ------------------------------------
 * Permet de gérer les opérations HTTP.
 * @type {module:http}
 */
const http = require('http');

/**
 * Déclarer notre hôte (Url du serveur web)
 * et son port (Port HTTP).
 */
const hostname = '127.0.0.1';
const port = 3000;

/**
 * Importe le module 'url' qui
 * nous permettra de lire l' url
 * et ses données.
 * @type {module:url}
 */

const url = require('url');

/**
 * Importe le module 'fr' qui
 * nous permettra d'accéder au
 * système de fichier.
 */

const fs = require('fs');


/**
 * Création de notre serveur NodeJS
 * @type {Server}
 */
const server = http.createServer( (req, res) => {

    let path = url.parse( req.url ).pathname;
    // console.log(_dirname);
    console.log(path);

    if (path === '/') {

        // -- Je me demande à NodeJS de lire mon fichier HTML.
        fs.readfile(__dirname + '/views/html/index.html',
            callback function(err,data) => {
            /**
             * Le contenu de ma fonction ne sera executé que lorsque
             * NodeJS aura fini la lecture de mon fichier.
             * -----------------------------------------------------
             * 'data' contient les données de ma page HTML.
             */

            // -- En cas d'erreur je l'affiche dans la console.
            if (err) console.log(err);

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=ut-8');
            res.end(data);

        }); // Fin de fs.readfile



    } else if (path === '/contacts') {

        let params = url.parse(req.url, true).query;
        let prenom = params.prenom;
        let nom = params.nom;

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=ut-8 ');
        res.end(`<html><body><h1> Mes contacts</h1></body></html>`);

    } else if (path === '/contact') {

        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=ut-8 ');
        res.end(`<html><body><h1>Mon contacts !</h1></body></html>`);
    }

}); // Fin du http.createServer()

/**
 * Démarrage du serveur et écoute
 * des connexion sur le port 3000.
 */
server.listen( port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Press CTRL-C to stop.\n`);
} );
