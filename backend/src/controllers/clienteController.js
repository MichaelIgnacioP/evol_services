/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////BDD//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const db = require('../db/index');


/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////HELPERS//////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

const validarYFormatearRut = require('../helpers/rutFormateado');

/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////CONTROLLERS//////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////

// Listar todos los clientes
const listarClientes = async (req, res) => {
    try {
        const query = 'SELECT * FROM clientes';
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (error) {
        console.error('Error al listar los clientes:', error);
        res.status(500).json({ error: 'Error al listar los clientes' });
    }
};

// Crear un nuevo cliente
const crearCliente = async (req, res) => {
    const { rut, nombre, direccion } = req.body;

    // Validar y dar formato al RUT utilizando el helper
    const rutFormateado = validarYFormatearRut(rut);

    if (!rutFormateado) {
        return res.status(400).json({ errorCode: 'INVALID_RUT', error: 'RUT chileno no válido' });
    }

    try {
        // Verificar si el RUT ya existe en la base de datos
        const verificarQuery = 'SELECT * FROM clientes WHERE rut = $1';
        const verificarResult = await db.query(verificarQuery, [rut]);

        if (verificarResult.rows.length > 0) {
            return res.status(400).json({ errorCode: 'DUPLICATE_RUT', error: 'El RUT ya existe en la base de datos' });
        }

        // Si el RUT no existe, procedemos a insertar el cliente
        const insertQuery = 'INSERT INTO clientes (rut, nombre, direccion) VALUES ($1, $2, $3) RETURNING *';
        const values = [rut, nombre, direccion];
        const { rows } = await db.query(insertQuery, values);
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ errorCode: 'SERVER_ERROR', error: 'Error al crear el cliente' });
    }
};

// Actualizar un cliente por ID
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { rut, nombre, direccion } = req.body;
    try {
        // Validar y dar formato al RUT utilizando el helper
        const rutFormateado = validarYFormatearRut(rut);

        if (!rutFormateado) {
            return res.status(400).json({ errorCode: 'INVALID_RUT', error: 'RUT chileno no válido' });
        }

        // Verificar si el RUT ya existe en la base de datos (excluyendo el cliente actual)
        const verificarQuery = 'SELECT * FROM clientes WHERE rut = $1 AND id != $2';
        const verificarResult = await db.query(verificarQuery, [rut, id]);

        if (verificarResult.rows.length > 0) {
            return res.status(409).json({ errorCode: 'DUPLICATE_RUT', error: 'El RUT ya existe en la base de datos' });
        }

        const query = 'UPDATE clientes SET rut = $1, nombre = $2, direccion = $3 WHERE id = $4 RETURNING *';
        const values = [rut, nombre, direccion, id];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ errorCode: 'CLIENT_NOT_FOUND', error: 'Cliente no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        console.error('Error al actualizar el cliente:', error);
        res.status(500).json({ errorCode: 'SERVER_ERROR', error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente por ID
const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM clientes WHERE id = $1 RETURNING *';
        const values = [id];
        const { rows } = await db.query(query, values);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({ mensaje: 'Cliente eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el cliente:', error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

module.exports = {
    listarClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
};







