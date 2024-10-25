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

  



  module.exports = {
    getComerciales,
    getOneComercial,

  }
  