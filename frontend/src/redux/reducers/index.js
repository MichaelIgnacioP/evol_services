import { combineReducers } from 'redux';
import clientesReducer from './clientes';
import medidoresReducer from './medidores';

export default combineReducers({
    clientes: clientesReducer,
    medidores: medidoresReducer
})