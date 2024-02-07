import axios from 'axios';
import {
  LISTAR_MEDIDORES_REQUEST,
  LISTAR_MEDIDORES_SUCCESS,
  LISTAR_MEDIDORES_FAILURE,
  CREAR_MEDIDOR_REQUEST,
  CREAR_MEDIDOR_SUCCESS,
  CREAR_MEDIDOR_FAILURE,
  ACTUALIZAR_MEDIDOR_REQUEST,
  ACTUALIZAR_MEDIDOR_SUCCESS,
  ACTUALIZAR_MEDIDOR_FAILURE,
  ELIMINAR_MEDIDOR_REQUEST,
  ELIMINAR_MEDIDOR_SUCCESS,
  ELIMINAR_MEDIDOR_FAILURE
} from './types';

// Acción para listar medidores
export const listarMedidores = () => async (dispatch) => {
  try {
    dispatch({ type: LISTAR_MEDIDORES_REQUEST });
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/medidores`);
    dispatch({
      type: LISTAR_MEDIDORES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: LISTAR_MEDIDORES_FAILURE, payload: error });
  }
};

// Acción para crear un medidor
export const crearMedidor = (medidorData) => async (dispatch) => {
  try {
    dispatch({ type: CREAR_MEDIDOR_REQUEST });
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/medidores`, medidorData);
    dispatch({
      type: CREAR_MEDIDOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: CREAR_MEDIDOR_FAILURE, payload: error });
  }
};

// Acción para actualizar un medidor
export const actualizarMedidor = (id, medidorData) => async (dispatch) => {
  try {
    dispatch({ type: ACTUALIZAR_MEDIDOR_REQUEST });
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/medidores/${id}`, medidorData);
    dispatch({
      type: ACTUALIZAR_MEDIDOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ACTUALIZAR_MEDIDOR_FAILURE, payload: error });
  }
};

// Acción para eliminar un medidor
export const eliminarMedidor = (id) => async (dispatch) => {
  try {
    dispatch({ type: ELIMINAR_MEDIDOR_REQUEST });
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/medidores/${id}`);
    dispatch({
      type: ELIMINAR_MEDIDOR_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: ELIMINAR_MEDIDOR_FAILURE, payload: error });
  }
};
