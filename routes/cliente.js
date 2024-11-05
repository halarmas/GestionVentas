const express = require("express");
const router = express.Router();


const clienteService = require("../services/clienteService");


router.get("/", async function (req, res,) {
	
	try {
        const resultado = await clienteService.getClientes();
        const msg = "Se han encontrado correctamente todos los clientes";
		let data = resultado.data;
        res.status(200).json({msg,data});
		
	} catch (err){
		console.error("Error en busqueda de clientes", err.message);
		res.sendStatus(500);
	}
});

router.get("/:id", async function (req, res) {
	const id= req.params.id;
try{
	const resultado = await clienteService.getOneCliente(id);
	console.debug(resultado);
	if(resultado.data.length>0){
        const data = resultado.data;
        const msg = "Se ha encontrado correctamente el cliente con esa id";
		res.status(200).json({msg,data});
		
	}else{
		const msg = "NO se ha encontrado el cliente con esa id";
		res.status(400).json({msg});
	}
	
}catch (err){
	console.error("ERROR en BBDD.", err.message);
		res.sendStatus(500);
}

});

router.post("/", async function (req, res) {
	const { nombre, apellido1, apellido2, ciudad, categoria } = req.body;


	if(nombre == undefined || apellido1 == undefined || apellido2 == undefined || ciudad == undefined || categoria == undefined){
		let msg = "El nombre, los dos apellidos, la ciudad y la categoria del comercial son obligatorios"
		res.status(400).json({msg});
	}else{

	let cliente = {
		Nombre: nombre,
		Apellido1: apellido1,
        Apellido2: apellido2,
		Ciudad: ciudad,
        Categoria: categoria,
	};
	try{
	let resultado = await clienteService.createCliente(cliente);
    const data = resultado.data;
    const msg = "Se ha creado el cliente correctamente";
    res.status(200).json({msg,cliente});
	
}	catch(err){
		console.error("ERROR en BBDD.", err.message);
		res.sendStatus(500);
		}
	}
});



module.exports = router;