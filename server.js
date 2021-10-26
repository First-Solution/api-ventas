// hacer el import de express tradicional
// const express = require('express');

// hacer el nuevo import
import Express from 'express';
import Cors from 'cors';
import dotenv from 'dotenv';
import { conectarBD } from './db/db.js';
import rutasVenta from './views/ventas/rutas.js';
import rutasUsuario from './views/usuarios/rutas.js';
import rutasProducto from './views/productos/rutas.js';


import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import authorizacionEstadoUsuario from './middlewares/autorizacionEstadoUsuario.js';
dotenv.config({ path: './.env' });


const app = Express();

app.use(Express.json());
app.use(Cors());

  var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://firstsolution-proyventas.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'api-autenticacion-ventas-mintic',
  issuer: 'https://firstsolution-proyventas.us.auth0.com/',
  algorithms: ['RS256']
  });

app.use(jwtCheck);
app.use(authorizacionEstadoUsuario);
app.use(rutasVenta);
app.use(rutasUsuario);
app.use(rutasProducto);

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};

conectarBD(main);