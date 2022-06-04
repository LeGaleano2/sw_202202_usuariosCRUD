const DaoObject = require('../../dao/DaoObject');
module.exports = class Usuario {
  UsuarioDao = null;
 
  //Ingresos y Egresos
//type, description, date, amount, category
  constructor ( UsuarioDao = null) {
    if (!(UsuarioDao instanceof DaoObject)) {
     throw new Error('An Instance of DAO Object is Required');
    }
    this.UsuarioDao = UsuarioDao;
  }
  async init(){
    await this.UsuarioDao.init();
    await this.UsuarioDao.setup();
  }
  async getUsuarioVersion () {
    return {
      entity: 'Usuario',
      version: '1.0.0',
      description: 'CRUD de Usuario'
    };
  }

  async addUsuario ({
    nombre,
    correo,
    contra,
    estado,
    avatar,
    fecha
  }) {
    const result =  await this.UsuarioDao.insertOne(
      {
        nombre,
        correo,
        contra,
        estado,
        avatar,
        fecha
      }
    );
    return {
        nombre,
        correo,
        contra,
        estado,
        avatar,
        fecha,
        id: result.lastID
    };
  };

  async getUsuario () {
    return this.UsuarioDao.getAll();
  }

  async getUsuarioById ({ codigo }) {
    return this.UsuarioDao.getById({codigo});
  }
  
  async updateUsuario ({
    id,
    nombre,
    correo,
    contra,
    estado,
    avatar }) {
const result = await this.UsuarioDao.updateOne({
    id,
    nombre,
    correo,
    contra,
    estado,
    avatar });
return {
  id: id,
  nombre: nombre,
  correo: correo,
  contra: contra,
  estado: estado,
  avatar: avatar,
  modified: result.changes
}
}
  async deleteUsuario({ codigo }) {
    const usuDelete = await this.UsuarioDao.getById({codigo});
    const result = await this.UsuarioDao.deleteOne({ codigo });
    return {
      ...usuDelete,
      deleted: result.changes
    };
  }
}