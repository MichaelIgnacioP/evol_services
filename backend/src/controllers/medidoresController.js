/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////BDD//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const db = require('../db/index');

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CONTROLLERS//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Listar todos los medidores
const listarMedidores = async (req, res) => {
    try {
        const query = 'SELECT * FROM medidores';
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al listar los medidores:', error);
        res.status(500).json({ error: 'Error al listar los medidores' });
    }
};

// Crear un nuevo medidor
const crearMedidor = async (req, res) => {
    const { codigo, nombre, fechaCreacion, descripcion, clienteId } = req.body; // Asegúrate de que clienteId esté disponible en el cuerpo de la solicitud.

    try {
        // Verificar si el cliente ya tiene 3 medidores
        const medidoresDelClienteQuery = 'SELECT COUNT(*) FROM medidores WHERE cliente_id = $1';
        const medidoresDelClienteValues = [clienteId];
        const { rows: medidoresDelClienteResult } = await db.query(medidoresDelClienteQuery, medidoresDelClienteValues);
        const cantidadMedidoresDelCliente = parseInt(medidoresDelClienteResult[0].count, 10);

        if (cantidadMedidoresDelCliente >= 3) {
            return res.status(400).json({ errorCode: 'METER_ERROR', error: 'El cliente ya tiene 3 medidores y no se pueden crear más.' });
        }

        // Verificar si el código es único
        const codigoUnicoQuery = 'SELECT COUNT(*) FROM medidores WHERE codigo = $1';
        const codigoUnicoValues = [codigo];
        const { rows: codigoUnicoResult } = await db.query(codigoUnicoQuery, codigoUnicoValues);
        const codigoYaExiste = parseInt(codigoUnicoResult[0].count, 10) > 0;

        if (codigoYaExiste) {
            return res.status(400).json({ errorCode: 'DUPLICATE_CODE', error: 'El código ya existe. Debe ser único.' });
        }

        // Insertar el medidor si todo está en orden
        const insertQuery = 'INSERT INTO medidores (codigo, nombre, fecha_creacion, descripcion, cliente_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const insertValues = [codigo, nombre, fechaCreacion, descripcion, clienteId];
        const { rows } = await db.query(insertQuery, insertValues);

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error al crear el medidor:', error);
        res.status(500).json({ errorCode: 'SERVER_ERROR', error: 'Error al crear el medidor' });
    }
};

// Actualizar un medidor por ID
const actualizarMedidor = async (req, res) => {
    const { id } = req.params;
    const { codigo, nombre, fechaCreacion, descripcion } = req.body;

    try {
        // Verificar si el código ya existe en otro medidor (excluyendo el medidor actual)
        const codigoUnicoQuery = 'SELECT COUNT(*) FROM medidores WHERE codigo = $1 AND id != $2';
        const codigoUnicoValues = [codigo, id];
        const { rows: codigoUnicoResult } = await db.query(codigoUnicoQuery, codigoUnicoValues);
        const codigoYaExiste = parseInt(codigoUnicoResult[0].count, 10) > 0;

        if (codigoYaExiste) {
            return res.status(400).json({ errorCode: 'DUPLICATE_CODE', error: 'El código ya existe en otro medidor. Debe ser único.' });
        }

        // Si el código no está duplicado, procedemos a actualizar el medidor
        const query = 'UPDATE medidores SET codigo = $1, nombre = $2, fecha_creacion = $3, descripcion = $4 WHERE id = $5 RETURNING *';
        const values = [codigo, nombre, fechaCreacion, descripcion, id];
        const { rows } = await db.query(query, values);

        if (rows.length === 0) {
            return res.status(404).json({ errorCode: 'METER_NOT_FOUND', error: 'Medidor no encontrado' });
        }

        res.json(rows[0]);
    } catch (error) {
        console.error('Error al actualizar el medidor:', error);
        res.status(500).json({ errorCode: 'SERVER_ERROR', error: 'Error al actualizar el medidor' });
    }
};

// Eliminar un medidor por ID
const eliminarMedidor = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM medidores WHERE id = $1 RETURNING *';
        const values = [id];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Medidor no encontrado' });
        }
        res.json({ mensaje: 'Medidor eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el medidor:', error);
        res.status(500).json({ error: 'Error al eliminar el medidor' });
    }
};

module.exports = {
    listarMedidores,
    crearMedidor,
    actualizarMedidor,
    eliminarMedidor
};