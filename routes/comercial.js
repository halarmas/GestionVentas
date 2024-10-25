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



module.exports = router;