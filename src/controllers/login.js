const {render} = require('ejs')
const conexion = require('../database/db')
const express = require('express')
const bcryptjs = require('bcryptjs');

exports.login = (req,res) =>{
    res.render('login')
}
exports.registro = (req,res) =>{
    res.render('registro')
}

exports.registrar = async(req,res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    conexion.query('INSERT INTO login SET ?',{user:user, pass:passwordHaash}, async(error, results) =>{
        if(error){
            console.log('el error es: '+error);
        }else{
            res.render('registro',{
                alert: true,
                alertTitle: "Registracion",
                alertMessage: "Successful Registration",
                alertIcon: 'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })
}

exports.logiar = async(req,res)=>{
    const user = req.body.user;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass, 8);
    if(user && pass){
        conexion.query('SELECT * FROM login WHERE user = ?', [user], async(error, results)=>{
            if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                res.render('login',{
                    alert: true,
                    alertTitle: "Error",
                    alertMessage: "Usuario Y/O Password incorrectas",
                    alertIcon: 'error',
                    showConfirmButton: true,
                    timer: false,
                    ruta: 'login'
                })
            }else{
                req.session.loggedin = true;                   
                req.session.name = results[0].user;
                res.render('login',{
                    alert: true,
                    alertTitle: "Conexion exitosa",
                    alertMessage: "Login Correcto",
                    alertIcon: 'success',
                    showConfirmButton: false,
                    timer: 1500,
                    ruta: ''
                })
            }
        });
    }else{
        res.render('login',{
            alert: true,
            alertTitle: "Advertencia",
            alertMessage: "Por favor ingrese un usuario y/o password",
            alertIcon: 'warning',
            showConfirmButton: true,
            timer: false,
            ruta: 'login'
        })
    }
}

exports.logout = (req, res) =>{
    req.session.destroy(()=>{
        res.redirect('/')
    })
}
