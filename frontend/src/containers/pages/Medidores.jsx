import React, { useState, useEffect } from 'react';
import Layout from 'hocs/layout/Layout';
import { connect } from 'react-redux';
import { listarMedidores, crearMedidor, eliminarMedidor } from 'redux/actions/medidores/medidores'; // Asegúrate de importar las acciones correctas
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

function Medidores(props) {
    const { medidores, listarMedidores, crearMedidor, eliminarMedidor } = props;
    const [searchCodigo, setSearchCodigo] = useState('');
    const [showAddDialog, setShowAddDialog] = useState(false);
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [newMedidorData, setNewMedidorData] = useState({ codigo: '', nombre: '', fecha_creacion: '', descripcion: '', cliente_id: '' });
    const [editMedidorData, setEditMedidorData] = useState({ id: null, codigo: '', nombre: '', fecha_creacion: '', descripcion: '', cliente_id: '' });
    const [medidorToDelete, setMedidorToDelete] = useState(null);

    useEffect(() => {
        listarMedidores();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/medidores?codigo=${searchCodigo}`);
            listarMedidores(response.data);
        } catch (error) {
            console.error('Error al buscar medidores:', error);
        }
    };

    const handleOpenAddDialog = () => {
        setShowAddDialog(true);
    };

    const handleCloseAddDialog = () => {
        setShowAddDialog(false);
    };

    const handleOpenEditDialog = (medidor) => {
        setEditMedidorData(medidor);
        setShowEditDialog(true);
    };

    const handleCloseEditDialog = () => {
        setShowEditDialog(false);
    };

    const handleOpenDeleteDialog = (medidor) => {
        setMedidorToDelete(medidor);
        setShowDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setShowDeleteDialog(false);
        setMedidorToDelete(null);
    };

    const handleNewMedidorChange = (e) => {
        const { name, value } = e.target;
        setNewMedidorData({ ...newMedidorData, [name]: value });
    };

    const handleEditMedidorChange = (e) => {
        const { name, value } = e.target;
        setEditMedidorData({ ...editMedidorData, [name]: value });
    };

    const handleSaveNewMedidor = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/medidores`, newMedidorData);
            if (response.status === 201) {
                listarMedidores();
                setShowAddDialog(false);
                setNewMedidorData({ codigo: '', nombre: '', fecha_creacion: '', descripcion: '', cliente_id: '' });
            }
        } catch (error) {
            console.error('Error al crear el medidor:', error);
        }
    };

    const handleSaveEditMedidor = async () => {
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/api/medidores/${editMedidorData.id}`,
                editMedidorData
            );
            if (response.status === 200) {
                const updatedMedidores = medidores.map((medidor) => {
                    if (medidor.id === editMedidorData.id) {
                        return { ...editMedidorData };
                    }
                    return medidor;
                });

                listarMedidores(updatedMedidores);

                setShowEditDialog(false);
            }
        } catch (error) {
            console.error('Error al editar el medidor:', error);
        }
    };

    const handleDeleteMedidor = async (id) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/medidores/${id}`);
            if (response.status === 200) {
                listarMedidores();
                setShowDeleteDialog(false);
            }
        } catch (error) {
            console.error('Error al eliminar el medidor:', error);
        }
    };

    return (
        <Layout>
            <div>
                <div className="flex items-center space-x-2 mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por Código"
                        value={searchCodigo}
                        onChange={(e) => setSearchCodigo(e.target.value)}
                        className="p-2 border rounded-lg"
                    />
                    <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                        Buscar
                    </button>
                </div>

                <div className="mb-4">
                    <button onClick={handleOpenAddDialog} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                        Agregar Medidor
                    </button>
                </div>

                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">ID</th>
                            <th className="border border-gray-300 p-2">Código</th>
                            <th className="border border-gray-300 p-2">Nombre</th>
                            <th className="border border-gray-300 p-2">Fecha de Creación</th>
                            <th className="border border-gray-300 p-2">Descripción</th>
                            <th className="border border-gray-300 p-2">Cliente ID</th>
                            <th className="border border-gray-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medidores.map((medidor) => (
                            <tr key={medidor.id}>
                                <td className="border border-gray-300 p-2">{medidor.id}</td>
                                <td className="border border-gray-300 p-2">{medidor.codigo}</td>
                                <td className="border border-gray-300 p-2">{medidor.nombre}</td>
                                <td className="border border-gray-300 p-2">{medidor.fecha_creacion}</td>
                                <td className="border border-gray-300 p-2">{medidor.descripcion}</td>
                                <td className="border border-gray-300 p-2">{medidor.cliente_id}</td>
                                <td className="border border-gray-300 p-2">
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => handleOpenEditDialog(medidor)}
                                            className="bg-yellow-500 text-white px-2 py-1 rounded-lg mx-1"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleOpenDeleteDialog(medidor);
                                                setMedidorToDelete(medidor);
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
                            placeholder="Código"
                            name="codigo"
                            value={newMedidorData.codigo}
                            onChange={handleNewMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={newMedidorData.nombre}
                            onChange={handleNewMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="date"
                            placeholder="Fecha de Creación"
                            name="fechaCreacion"
                            value={newMedidorData.fechaCreacion}
                            onChange={handleNewMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Descripción"
                            name="descripcion"
                            value={newMedidorData.descripcion}
                            onChange={handleNewMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="number"
                            placeholder="Cliente ID"
                            name="clienteId"
                            value={newMedidorData.clienteId}
                            onChange={handleNewMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <button
                            onClick={handleSaveNewMedidor}
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
                            placeholder="Código"
                            name="codigo"
                            value={editMedidorData.codigo}
                            onChange={handleEditMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Nombre"
                            name="nombre"
                            value={editMedidorData.nombre}
                            onChange={handleEditMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="date"
                            placeholder="Fecha de Creación"
                            name="fechaCreacion"
                            value={editMedidorData.fechaCreacion}
                            onChange={handleEditMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Descripción"
                            name="descripcion"
                            value={editMedidorData.descripcion}
                            onChange={handleEditMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <input
                            type="number"
                            placeholder="Cliente ID"
                            name="clienteId"
                            value={editMedidorData.clienteId}
                            onChange={handleEditMedidorChange}
                            className="block w-full p-2 border rounded-lg mb-2"
                        />
                        <button
                            onClick={handleSaveEditMedidor}
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
                        <p>¿Seguro que deseas eliminar el medidor?</p>
                        <button
                            onClick={() => {
                                if (medidorToDelete) {
                                    handleDeleteMedidor(medidorToDelete.id);
                                    setShowDeleteDialog(false);
                                    setMedidorToDelete(null);
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
            </div>
        </Layout>
    );
}

const mapStateToProps = (state) => ({
    medidores: state.medidores.medidores,
});

export default connect(mapStateToProps, { listarMedidores, crearMedidor, eliminarMedidor })(Medidores);
