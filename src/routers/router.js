const express = require('express')
const router = express.Router()
const crud = require('../controllers/crud')
const login = require('../controllers/login')

router.get('/',crud.listar)
router.get('/login',login.login)
router.post('/logiar',login.logiar)
router.get('/registro',login.registro)
router.post('/registrar',login.registrar)
router.get('/logout',login.logout)
router.get('/logoutAUX',crud.listar)

router.post('/add',crud.save)
router.get('/delete/:id',crud.delete)
router.get('/insertar',crud.insertar)
router.get('/update/:id',crud.edit)

router.post('/update/:id',crud.update)



module.exports = router