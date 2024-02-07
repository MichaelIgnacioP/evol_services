import axios from 'axios';
import {
    LISTAR_CLIENTES_REQUEST,
    LISTAR_CLIENTES_SUCCESS,
    LISTAR_CLIENTES_FAILURE,
    CREAR_CLIENTE_REQUEST,
    CREAR_CLIENTE_SUCCESS,
    CREAR_CLIENTE_FAILURE,
    ACTUALIZAR_CLIENTE_REQUEST,
    ACTUALIZAR_CLIENTE_SUCCESS,
    ACTUALIZAR_CLIENTE_FAILURE,
    ELIMINAR_CLIENTE_REQUEST,
    ELIMINAR_CLIENTE_SUCCESS,
    ELIMINAR_CLIENTE_FAILURE
  } from './types';

// Acción para listar clientes
export const listarClientes = () => async (dispatch) => {
  try {
    dispatch({ type: LISTAR_CLIENTES_REQUEST });
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/clientes`);
    dispatch({
      type: LISTAR_CLIENTES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: LISTAR_CLIENTES_FAILURE, payload: error });
  }
};

// Acción para crealiente
export const crearCliente = (clienteData) => async (dispatch) => {
  try {
    dispatch({ type: CREAR_CLIENTE_REQUEST });
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/clientes`, clienteData);
    dispatch({
      type: CREAR_CLIENTE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: CREAR_CLIENTE_FAILURE, payload: error });
  }
};

// Acción para actualizar un cliente
export const actualizarCliente = (id, clienteData) => async (dispatch) => {
  try {
    dispatch({ type: ACTUALIZAR_CLIENTE_REQUEST });
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/clientes/${id}`, clienteData);
    dispatch({
      type: ACTUALIZAR_CLIENTE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ACTUALIZAR_CLIENTE_FAILURE, payload: error });
  }
};

// Acción para eliminar un cliente
export const eliminarCliente = (id) => async (dispatch) => {
  try {
    dispatch({ type: ELIMINAR_CLIENTE_REQUEST });
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/clientes/${id}`);
    dispatch({
      type: ELIMINAR_CLIENTE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ELIMINAR_CLIENTE_FAILURE, payload: error });
  }
};
