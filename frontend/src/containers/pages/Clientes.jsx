import React, { useState, useEffect } from 'react';
import Layout from 'hocs/layout/Layout';
import { connect } from 'react-redux';
import { listarClientes, crearCliente, eliminarCliente } from 'redux/actions/clientes/clientes';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Clientes(props) {
    const { clientes, listarClientes, crearCliente, eliminarCliente } = props;
    const [searchRut, setSearchRut] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [newClienteData, setNewClienteData] = useState({ rut: '', nombre: '', direccion: '' });
    const [editClienteData, setEditClienteData] = useState({ id: null, rut: '', nombre: '', direccion: '' });
    const [clienteToDelete, setClienteToDelete] = useState(null);

    useEffect(() => {
        listarClientes();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/clientes?rut=${searchRut}`);
            listarClientes(response.data);
        } catch (error) {
            console.error('Error al buscar clientes:', error);
        }
    };

    const handleOpenAddDialog = () => {
        setShowAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setShowAddDialog(false);
    };

    const handleOpenEditDialog = (cliente) => {
        setEditClienteData(cliente);
        setShowEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setShowEditDialog(false);
    };

    const handleOpenDeleteDialog = (cliente) => {
        setClienteToDelete(cliente);
        setShowDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
        setClienteToDelete(null);
    };

    const handleNewClienteChange = (e) => {
        const { name, value } = e.target;
        setNewClienteData({ ...newClienteData, [name]: value });
    };

    const handleEditClienteChange = (e) => {
        const { name, value } = e.target;
        setEditClienteData({ ...editClienteData, [name]: value });
    };

    const handleSaveNewCliente = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/clientes`, newClienteData);
            if (response.status === 201) {
                listarClientes();
                setShowAddDialog(false);
                setNewClienteData({ rut: '', nombre: '', direccion: '' }); // Limpiar los campos después de agregar
            }
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    };

    const handleSaveEditCliente = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/clientes/${editClienteData.id}`,
                editClienteData
            );
            if (response.status === 200) {
                const updatedClientes = clientes.map((cliente) => {
                    if (cliente.id === editClienteData.id) {
                        return { ...editClienteData };
                    }
                    return cliente;
                });

                listarClientes(updatedClientes);

                setShowEditDialog(false);
            }
        } catch (error) {
            console.error('Error al editar el cliente:', error);
        }
    };

    const handleDeleteCliente = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/clientes/${id}`);
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Error al eliminar el cliente:', error);
        }
    };

    return (
        <Layout>
            <div className="flex items-center space-x-2 mb-4">
                <input
                    type="text"
                    placeholder="Buscar por RUT"
                    value={searchRut}
                    onChange={(e) => setSearchRut(e.target.value)}
                    className="p-2 border rounded-lg"
                />
                <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                    Buscar
                </button>
            </div>

            <div className="mb-4">
                <button onClick={handleOpenAddDialog} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    Agregar Cliente
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2">ID</th>
                        <th className="border border-gray-300 p-2">RUT</th>
                        <th className="border border-gray-300 p-2">Nombre</th>
                        <th className="border border-gray-300 p-2">Dirección</th>
                        <th className="border border-gray-300 p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id}>
                            <td className="border border-gray-300 p-2">{cliente.id}</td>
                            <td className="border border-gray-300 p-2">{cliente.rut}</td>
                            <td className="border border-gray-300 p-2">{cliente.nombre}</td>
                            <td className="border border-gray-300 p-2">{cliente.direccion}</td>
                            <td className="border border-gray-300 p-2">
                                <div className="flex justify-center items-center">
                                    <button
                                        onClick={() => handleOpenEditDialog(cliente)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded-lg mx-1"
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleOpenDeleteDialog(cliente);
                                            setClienteToDelete(cliente);
                                        }}
                                        className="bg-red-500 text-white px-2 py-1 rounded-lg mx-1"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddDialog && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                    <input
                        type="text"
                        placeholder="RUT"
                        name="rut"
                        value={newClienteData.rut}
                        onChange={handleNewClienteChange}
                        className="block w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={newClienteData.nombre}
                        onChange={handleNewClienteChange}
                        className="block w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Dirección"
                        name="direccion"
                        value={newClienteData.direccion}
                        onChange={handleNewClienteChange}
                        className="block w-full p-2 border rounded-lg mb-2"
                    />
                    <button
                        onClick={handleSaveNewCliente}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Guardar
                    </button>
                    <button
                        onClick={handleCloseAddDialog}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                </div>
            )}

            {showEditDialog && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                    <input
                        type="text"
                        placeholder="RUT"
                        name="rut"
                        value={editClienteData.rut}
                        onChange={handleEditClienteChange}
                        className="block w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Nombre"
                        name="nombre"
                        value={editClienteData.nombre}
                        onChange={handleEditClienteChange}
                        className="block w-full p-2 border rounded-lg mb-2"
                    />
                    <input
                        type="text"
                        placeholder="Dirección"
                        name="direccion"
                        value={editClienteData.direccion}
                        onChange={handleEditClienteChange}
                        className="block w-full p-2 border rounded-lg mb-2"
                    />
                    <button
                        onClick={handleSaveEditCliente}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleCloseEditDialog}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                </div>
            )}

            {showDeleteDialog && (
                <div className="mt-4 p-4 border border-gray-300 rounded-lg">
                    <p>¿Seguro que deseas eliminar al cliente?</p>
                    <button
                        onClick={() => {
                            if (clienteToDelete) {
                                handleDeleteCliente(clienteToDelete.id);
                                setShowDeleteDialog(false);
                                setClienteToDelete(null);
                            }
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                        Eliminar
                    </button>
                    <button
                        onClick={handleCloseDeleteDialog}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
                    >
                        Cancelar
                    </button>
                </div>
            )}
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    clientes: state.clientes.clientes,
});

export default connect(mapStateToProps, { listarClientes, crearCliente, eliminarCliente })(Clientes);
