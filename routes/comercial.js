const express = require("express");
const router = express.Router();


const comercialService = require("../services/comercialService");


router.get("/", async function (req, res,) {
	
	try {
        const resultado = await comercialService.getComerciales();
        const msg = "Se han encontrado correctamente todos los comerciales";
		let data = resultado.data;
        res.status(200).json({msg,data});
		
	} catch (err){
		console.error("Error en busqueda de comerciales", err.message);
		res.sendStatus(500);
	}
});

router.get("/:id", async function (req, res) {
	const id= req.params.id;
try{
	const resultado = await comercialService.getOneComercial(id);
	console.debug(resultado);
	if(resultado.data.length>0){
        const data = resultado.data;
        const msg = "Se ha encontrado correctamente el comercial con esa id";
		res.status(200).json({msg,data});
		
	}else{
		const msg = "NO se ha encontrado el comercial con esa id";
		res.status(400).json({msg});
	}
	
}catch (err){
	console.error("ERROR en BBDD.", err.message);
		res.sendStatus(500);
}

});

router.post("/", async function (req, res) {
	const { nombre, apellido1, apellido2, comision } = req.body;


	if(nombre == undefined || apellido1 == undefined || apellido2 == undefined || comision == undefined){
		let msg = "El nombre, los dos apellidos y la comision del comercial son obligatorios"
		res.status(400).json({msg});
	}else{

	let comercial = {
		nombre: nombre,
		apellido1: apellido1,
        apellido2: apellido2,
		comision: comision,
	};
	try{
	let resultado = await comercialService.createComercial(comercial);
    console.debug(data);
    const msg = "Se ha creado el comercial correctamente con id:" +data.insertId;
	const comercialCreado = await comercialService.getOneComercial(data.insertId);
    res.status(200).json(helper.outputJSON(msg,comercialCreado[0]));
	
}	catch(err){
		console.error("ERROR en BBDD.", err.message);
		res.sendStatus(500);
		}
	}
});



module.exports = router;