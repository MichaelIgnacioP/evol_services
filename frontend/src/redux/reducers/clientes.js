import * as types from '../actions/clientes/types';

const initialState = {
  clientes: [],
  loading: false,
  error: null,
};

const clientesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LISTAR_CLIENTES_REQUEST:
    case types.CREAR_CLIENTE_REQUEST:
    case types.ACTUALIZAR_CLIENTE_REQUEST:
    case types.ELIMINAR_CLIENTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LISTAR_CLIENTES_SUCCESS:
      return {
        ...state,
        clientes: action.payload,
        loading: false,
      };
    case types.CREAR_CLIENTE_SUCCESS:
      return {
        ...state,
        clientes: [...state.clientes, action.payload],
        loading: false,
      };
    case types.ACTUALIZAR_CLIENTE_SUCCESS:
      return {
        ...state,
        clientes: state.clientes.map((cliente) =>
          cliente.id === action.payload.id ? action.payload : cliente
        ),
        loading: false,
      };
    case types.ELIMINAR_CLIENTE_SUCCESS:
      return {
        ...state,
        clientes: state.clientes.filter((cliente) => cliente.id !== action.payload.id),
        loading: false,
      };
    case types.LISTAR_CLIENTES_FAILURE:
    case types.CREAR_CLIENTE_FAILURE:
    case types.ACTUALIZAR_CLIENTE_FAILURE:
    case types.ELIMINAR_CLIENTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default clientesReducer;
