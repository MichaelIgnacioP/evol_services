import * as types from '../actions/medidores/types';

const initialState = {
  medidores: [],
  loading: false,
  error: null,
};

const medidoresReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LISTAR_MEDIDORES_REQUEST:
    case types.CREAR_MEDIDOR_REQUEST:
    case types.ACTUALIZAR_MEDIDOR_REQUEST:
    case types.ELIMINAR_MEDIDOR_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LISTAR_MEDIDORES_SUCCESS:
      return {
        ...state,
        medidores: action.payload,
        loading: false,
      };
    case types.CREAR_MEDIDOR_SUCCESS:
      return {
        ...state,
        medidores: [...state.medidores, action.payload],
        loading: false,
      };
    case types.ACTUALIZAR_MEDIDOR_SUCCESS:
      return {
        ...state,
        medidores: state.medidores.map((medidor) =>
          medidor.id === action.payload.id ? action.payload : medidor
        ),
        loading: false,
      };
    case types.ELIMINAR_MEDIDOR_SUCCESS:
      return {
        ...state,
        medidores: state.medidores.filter((medidor) => medidor.id !== action.payload.id),
        loading: false,
      };
    case types.LISTAR_MEDIDORES_FAILURE:
    case types.CREAR_MEDIDOR_FAILURE:
    case types.ACTUALIZAR_MEDIDOR_FAILURE:
    case types.ELIMINAR_MEDIDOR_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default medidoresReducer;
