const express = require('express');
const router = express.Router();
const Usuario = require('../../../../libs/Usuario')
const { route } = require('express/lib/application');
//const { getCategoryById, getCategoryVersion, getCategory, addCategory, updateCategory, deleteCategory } = require('../../../../libs/categorias');
const UsuarioDao = require('../../../../dao/models/UsuarioDao');
const { type } = require('express/lib/response');
const usuDao = new UsuarioDao();
const usu = new Usuario(usuDao);
usu.init();

//const catDao2 = new CategoryDao();


router.get('/', async (req, res)=>{
    //validar datos del request
    //devolver la ejecucion del controlador de esta ruta
    //manejar el error que se pueda tirar el controlador
    try{
        const versionData = await usu.getUsuarioVersion();
        return res.status(200).json(versionData);
    }

    catch(ex){
        console.error('Error Usuario', ex);
        return res.status(502).json({'error':'Error interno de server'});
    }

});//get


router.get('/all', async(req, res) =>  {
try{

    const Usuario = await usu.getUsuario();
    return res.status(200).json(Usuario);
}
catch(ex){
    console.error(ex);
    res.status(501).json({error:'error al procesar solicitud.'});
}
});

router.post('/new', async(req, res)=>{
    try{

        const{nombre='', correo='', contra='', estado, avatar=''}= req.body;

            
    if (/^\s*$/.test(nombre)) {
        return res.status(400).json({
          error: 'Se espera valor de nombre'
        });
      }

      if (/^\s*$/.test(correo)) {
        return res.status(400).json({
          error: 'Se espera valor de correo'
        });
      }
 
      if (/^\s*$/.test(avatar)) {
        return res.status(400).json({
          error: 'Se espera url de avatar'
        });
      }

      if (/^\s*$/.test(contra)) {
        return res.status(400).json({
          error: 'Se espera valor de contraseña correcta'
        });
      }

        if(!(/^(ACT)|(INA)$/.test(estado))){
            return res.status(400).json({
                error: 'Se espera valor de ACT o INA'
            });
        }
      


        const newUsuario =  await usu.addUsuario({nombre, correo, contra, estado, avatar});
        return res.status(200).json(newUsuario);
        } catch(ex){
        console.error(ex);
       return res.status(502).json({error:'error al procesar solicitud de los datos'});
    }

})


router.put('/update/:id', async (req, res)=>{
    try {
      const {id} = req.params;
      if(!(/^\d+$/.test(id))) {
        return res.status(400).json({error:'El codigo debe ser un dígito válido.'});
      }
      const {nombre,correo,contra,estado,avatar} = req.body;
       
      if (/^\s*$/.test(nombre)) {
        return res.status(400).json({
          error: 'Se espera valor de nombre'
        });
      }
/*
      if (/^\s*$/.test(ElementInternals)) {
        return res.status(400).json({
          error: 'Se espera valor de correo'
        });
      }
*/
      if (/^\s*$/.test(contra)) {
        return res.status(400).json({
          error: 'Se espera valor de contraseña correcta'
        });
      }

      if (!(/^(ACT)|(INA)$/.test(estado))) {
        return res.status(400).json({
          error: 'Se espera valor de estado en ACT o INA'
        });
      }

      if (/^\s*$/.test(avatar)) {
        return res.status(400).json({
          error: 'Se espera url de avatar'
        });
      }

        
      const updateResult = await usu.updateUsuario({id:parseInt(id),nombre, correo, contra, estado, avatar});
  
      if (!updateResult) {
        return res.status(404).json({error:'Usuario no encontrado.'});
      }
      return res.status(200).json({updatedUsuario:updateResult});
  
    } catch(ex) {
      console.error(ex);
      res.status(500).json({error: 'Error al procesar solicitud.'});
    }
  });
  
  router.delete('/delete/:codigo', async (req, res) => {
    try {
      const { codigo } = req.params;
      if (!(/^\d+$/.test(codigo))) {
        return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
      }
  
      const deletedUsuario = await usu.deleteUsuario({ codigo: parseInt(codigo)});
  
      if (!deletedUsuario) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      return res.status(200).json({ deletedUsuario});
  
    } catch (ex) {
      console.error(ex);
      res.status(500).json({ error: 'Error al procesar solicitud.' });
    }
  });
  

router.get('/searchUsuario/:codigo', async (req, res) => {
    try {
      const { codigo } = req.params;
      if (!(/^\d+$/.test(codigo))) {
        return res.status(400).json({ error: 'El codigo debe ser un dígito válido.' });
      }
  
      const Usuario = await usu.getUsuarioById({ codigo: parseInt(codigo)});
  
      if (!Usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
      }
      return res.status(200).json({ Usuario});
  
    } catch (ex) {
      console.error(ex);
      res.status(500).json({ error: 'Error al procesar solicitud.' });
    }
  });

module.exports = router;
