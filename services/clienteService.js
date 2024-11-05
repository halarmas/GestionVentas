const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getClientes(){
  
    const rows = await db.query(`SELECT * FROM cliente`);
    
    const data = helper.emptyOrRows(rows);
    
  
    return {data};
  }

  async function getOneCliente(id) {

    const rows = await db.query('SELECT * FROM cliente WHERE id=' + id + ';');
  
    const data = helper.emptyOrRows(rows);
  
    return {data};
    
  }

  async function createCliente(cliente) {

    let sql = "INSERT INTO `cliente` (`nombre`, `apellido1`, `apellido2`, `ciudad`, `categoria`) VALUES (";
    sql += "'"+cliente.nombre+"','"+cliente.apellido1+"','"+cliente.apellido2+"','"+cliente.ciudad+"','"+cliente.categoria+"');";
    
  
    console.debug(sql); 
  
    const rows = await db.query(sql);
  
    const data = helper.emptyOrRows(rows);
    return {data}
  
  }

  

  module.exports = {
    getClientes,
    getOneCliente,
    createCliente,

  }
  