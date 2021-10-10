import { ObjectId } from 'mongodb';
import { getDB } from '../../db/db.js';

const queryAllVentas = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').find({}).limit(50).toArray(callback);
};

const crearVenta = async (datosVenta, callback) => {
  if (
    Object.keys(datosVenta).includes('idVenta') &&
    Object.keys(datosVenta).includes('nombreCl') &&
    Object.keys(datosVenta).includes('Estado') &&
    Object.keys(datosVenta).includes('correo') &&
    Object.keys(datosVenta).includes('valor') &&
    Object.keys(datosVenta).includes('fechaI') &&
    Object.keys(datosVenta).includes('fechaF') &&
    Object.keys(datosVenta).includes('responsable') &&
    Object.keys(datosVenta).includes('producto') 

  ) {
    const baseDeDatos = getDB();
    // implementar código para crear vehículo en la BD
    await baseDeDatos.collection('venta').insertOne(datosVenta, callback);
  } else {
    return 'error';
  }
};

const consultarVenta = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').findOne({ _id: new ObjectId(id) }, callback);
};

const editarVenta = async (id, edicion, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection('venta')
    .findOneAndUpdate(filtroVenta, operacion, { upsert: true, returnOriginal: true }, callback);
};

const eliminarVenta = async (id, callback) => {
  const filtroVenta = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection('venta').deleteOne(filtroVenta, callback);
};

export { queryAllVentas, crearVenta, consultarVenta, editarVenta, eliminarVenta };
