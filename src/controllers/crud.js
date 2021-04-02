const {render} = require('ejs')
const conexion = require('../database/db')

exports.listar = (req,res) =>{
    if(req.session.loggedin){
        conexion.query('SELECT * FROM customer',(error, results)=>{
            if(error){
                res.json(error)
            }
            res.render('index', {
                data: results,
                login: true,
                name: req.session.name
            })
        })
    }else{
        res.render('index', {
            login: false,
            name: 'debe iniciar sesion'
        })
    }
}

exports.insertar = (req,res) =>{
    if(req.session.loggedin){
        res.render('insertar',{
            login: true,
            name: req.session.name
        });
    }else{
        res.render('insertar', {
            login: false,
            name: 'debe iniciar sesion'
        })
    }
}

exports.editar = (req,res) =>{
    if(req.session.loggedin){
        res.render('editar',{
            login: true,
            name: req.session.name
        });
    }else{
        res.render('editar', {
            login: false,
            name: 'debe iniciar sesion'
        })
    }
}

exports.save = (req, res) => {
    const data = req.body;
        conexion.query('INSERT INTO customer set ?', [data], (err, customer) => {
            res.redirect('/')
        })
}

exports.edit = (req, res) => {
    const { id } = req.params;
        conexion.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            if(req.session.loggedin){
                res.render('editar',{
                    data: customer[0],
                    login: true,
                    name: req.session.name
                });
            }else{
                res.render('editar', {
                    login: false,
                    name: 'debe iniciar sesion'
                })
            }
        })
}

exports.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
        conexion.query('UPDATE customer set ? WHERE id = ?', [newCustomer,id], (err, rows) => {
            res.redirect('/')
        })
}

exports.delete = (req, res) => {
    const {id}  = req.params;
        conexion.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/')
        })
}