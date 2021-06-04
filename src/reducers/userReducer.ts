const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const SET_ERROR = "SET_ERROR";
const defaultState = {
  currentUser: {},
  isAuth: false,
  error: "",
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.user,
        isAuth: true,
        error: "",
        registred: false,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        error: "",
        registred: false,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.error,
        registred: false,
      };
    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, user: user });
export const logout = () => ({ type: LOGOUT });
export const setError = (error) => ({ type: SET_ERROR, error: error });
