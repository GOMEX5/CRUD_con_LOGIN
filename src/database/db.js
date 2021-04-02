const mysql = require('mysql')

const conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'sistema_online'
})

conexion.connect((error)=>{
    if(error){
        console.error('el error es: '+error)
        return
    }
    console.log('Conectado a la BD');
})

module.exports = conexion;