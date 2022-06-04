//se va a encargar de coordinar uniendo todas las entidades "conmutador"

const express = require('express');
const router= express.Router();


const usuariosRoutes = require('./usuarios')

router.use('/Usuario',usuariosRoutes);


module.exports=router;