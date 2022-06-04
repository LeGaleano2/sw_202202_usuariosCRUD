const {db} = require("../Connection")
const DaoObject = require("../DaoObject");

module.exports = class UsuarioDao extends DaoObject{
        constructor(db=null){
          console.log('UsuarioDao db: ', db);
            super(db);
        }
        async setup(){
            if(process.env.SQLITE_SETUP){
                const createStatement = 'CREATE TABLE IF NOT EXISTS Usuario (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, correo TEXT, contra TEXT, status TEXT, avatar TEXT, fechaingreso TEXT);';
               await this.run(createStatement);
            }
        }

        insertOne({nombre, correo, contra, estado, avatar}) {
            const fecha = new Date().toDateString();
            const sqlstr = 'INSERT INTO Usuario (nombre, correo, contra, status, avatar, fechaingreso) values (?, ?, ?, ?, ?, ?);';
            const sqlParamArr = [nombre, correo, contra, estado, avatar, fecha];
            return this.run(sqlstr, sqlParamArr);
          }

          updateOne({id,nombre, correo, contra, estado, avatar}){
            const sqlstr= 'UPDATE Usuario set nombre = ?, correo = ?, contra = ?, status = ?, avatar =? where id = ?;';
            const sqlParamArr = [ nombre, correo, contra, estado, avatar, id];
            console.log(sqlParamArr)
            return this.run(sqlstr, sqlParamArr);
          }
        
          deleteOne({ codigo }) {
            const sqlstr = 'DELETE FROM Usuario where id = ?;';
            const sqlParamArr = [codigo];
            return this.run(sqlstr, sqlParamArr);
          }

    async getAll(){
         return this.all('Select * from Usuario;', []
       
        );
    }


    getById( {codigo} ){
        const sqlstr= 'SELECT * from Usuario where id=?;';
        const sqlParamArr = [codigo];
        return this.get(sqlstr, sqlParamArr);
      }
      
      

}