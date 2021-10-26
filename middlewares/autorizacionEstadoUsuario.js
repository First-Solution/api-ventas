import { ObjectId } from 'mongodb';
import { getDB } from '../db/db.js';
import jwt_decode from 'jwt-decode';
const authorizacionEstadoUsuario = async (req,res,next) =>{
    const token = req.headers.authorization.split('Bearer ')[1];
    const user = jwt_decode(token)['http://localhost/userData'];
    console.log(user);
    const baseDeDatos = getDB();
    await baseDeDatos.collection('usuario').findOne({ email:user.email }, async (err,response)=>{
    console.log('response consulta db',response);
    if(response){
        if(response.Estado =="Inactivo"||response.Estado =="Pendiente"){
           res.sendStatus(401);
           res.end();
        }else{
          console.log("Habilitado");
           next();
        }
    }
else{
    next();
}});

    };
export default authorizacionEstadoUsuario;