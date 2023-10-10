const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const medidoresController = require('../controllers/medidoresController');

// Rutas para clientes
router.get('/clientes', clienteController.listarClientes);
router.post('/clientes', clienteController.crearCliente);
router.put('/clientes/:id', clienteController.actualizarCliente);
router.delete('/clientes/:id', clienteController.eliminarCliente);

// Rutas para medidores
router.get('/medidores', medidoresController.listarMedidores);
router.post('/medidores', medidoresController.crearMedidor);
router.put('/medidores/:id', medidoresController.actualizarMedidor);
router.delete('/medidores/:id', medidoresController.eliminarMedidor);

module.exports = router;
