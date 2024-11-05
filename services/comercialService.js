const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getComerciales(){
  
    const rows = await db.query(`SELECT * FROM comercial`);
    
    const data = helper.emptyOrRows(rows);
    
  
    return {data};
  }

  async function getOneComercial(id) {

    const rows = await db.query('SELECT * FROM comercial WHERE id=' + id + ';');
  
    const data = helper.emptyOrRows(rows);
  
    return {data};
    
  }

  async function createComercial(comercial) {

    let sql = "INSERT INTO `comercial` (`nombre`, `apellido1`,`apellido2`, `comision`) VALUES (";
    sql += "'"+comercial.nombre+"','"+comercial.apellido1+"','"+comercial.apellido2+"','"+comercial.comision+"');";
    
  
    console.debug(sql); 
  
    const rows = await db.query(sql);
  
    const data = helper.emptyOrRows(rows);
    return {data}
  
  }

  

  module.exports = {
    getComerciales,
    getOneComercial,
    createComercial,

  }
  